import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { LinkWrapper, ResWrapper, CentralWrapper, today, stalls, timesDB } from './constants'
import { ResValLink, ResTodayLink } from './ResLink'
import { modalStyle } from './ResModal'
import { headerStyle, btnStyle, bodyStyle, theme, NoBookingDiv, ValidatedDiv, ViolatedDiv } from './resValHelper'
import LoginReminder from '../userAuth/LoginReminder'
import Spinner from '../util/Spinner'
import { CredContext } from '../../contexts/CredContext'
import firebaseApp from '../../firebase'


const db = firebaseApp.database()

const attemptLimits = 3
let ref = null
let times = []
let stall = null
let doneFirstIter = false

class ResVal extends Component {
  static contextType = CredContext
  state = {
    open: false,
    error: false,
    input: '',
    hasBooked: null,
    validated: false,
    violated: false,
    valCount: null
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClick = () => {
    const { input } = this.state

    if (input === ref) {
      this.setState({
        open: false,
        error: false,
        validated: true
      })
      times.forEach(time => {
        const restUrl = `reservation/${today}/stall${stall}/${time}`
        db.ref(restUrl).update({ validated: true })
      })
    }

    else if (input !== ref && this.state.valCount < attemptLimits) {
      this.setState(prevState => ({
        error: true,
        valCount: prevState.valCount + 1
      }), () => {
        times.forEach(time => {
          const restUrl = `reservation/${today}/stall${stall}/${time}`
          db.ref(restUrl).update({ valCount: this.state.valCount })
        })
        if (this.state.valCount === attemptLimits) {
          this.setState({
            open: false,
            error: false,
            violated: true
          }, () => {
            times.forEach(time => {
              const restUrl = `reservation/${today}/stall${stall}/${time}`
              db.ref(restUrl).update({ violated: true })
            })
          })
        }
      })
    }
  }

  handleClose = () => {
    this.setState({ open: false })
    this.setState({ input: '' })
    this.setState({ error: false })
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value })
  }

  componentDidMount() {
    const { myUid } = this.context
    const reservationRef = db.ref(`reservation/${today}`)
    reservationRef.once('value')
      .then(snapshot => {
        if (!snapshot.exists()) this.setState({ hasBooked: false })

        else {
          const resData = snapshot.val()
          const resStalls = Object.keys(resData)
          const resInfo = resStalls.map(stall => Object.values(resData[stall]))
          let found = false
          for (let i = 0; i < resInfo.length && !found; i++) {
            for (let j = 0; j < resInfo[i].length; j++) {
              if (resInfo[i][j].uid === myUid) {
                found = true
                times.push(timesDB[j])
                if (!doneFirstIter) {
                  this.setState({ hasBooked: true })
                  if (resInfo[i][j].valCount === attemptLimits) this.setState({ violated: true })
                  else if (resInfo[i][j].validated) this.setState({ validated: true })
                  else {
                    this.setState({ valCount: resInfo[i][j].valCount })
                    stall = stalls[i]
                    ref = resInfo[i][j].bookingRef
                  }
                }
              }
            }
          }
          if (!found) this.setState({ hasBooked: false })
        }
      })
  }

  render() {
    const { open, error, input, hasBooked, validated, violated, valCount } = this.state
    const { login } = this.props
    if (login === null || hasBooked === null) return (<Spinner />)
    return(login ? (
      <ResWrapper>
        <LinkWrapper>
          <ResValLink />
          <ResTodayLink />
        </LinkWrapper>
        <MuiThemeProvider theme={theme}>
          <CentralWrapper>
            {!hasBooked && (
              <NoBookingDiv>
                You don&#39;t have any reservations to validate for today
              </NoBookingDiv>
            )}
            {validated && (
              <ValidatedDiv>
                You have successfully validated your booking
              </ValidatedDiv>
            )}
            {violated && (
              <ViolatedDiv>
                You have used all {attemptLimits} attempts. The reservation is no longer valid
              </ViolatedDiv>
            )}
            {!violated && !validated && hasBooked && (
              <Button style={{ ...btnStyle, fontSize: '16px' }} onClick={this.handleOpen}>
                Validate my booking
              </Button>
            )}
          </CentralWrapper>
          <Modal
            aria-labelledby='reservation-validation-modal'
            open={open}
            onClose={this.handleClose}
          >
            <div style={{...modalStyle, textAlign: 'center'}}>
              <Typography variant='h6' style={headerStyle}>
                BOOKING VALIDATION
              </Typography>
              <TextField
                label='Booking Reference'
                autoFocus
                error={error}
                InputProps={{
                  style: { fontSize: '22px' }
                }}
                inputProps={{
                  style: { textAlign: 'center', letterSpacing: '10px' },
                  maxLength: 4
                }}
                variant='outlined'
                value={input}
                onChange={this.handleChange}
              />
              {error && (
                <Typography variant="body2" style={bodyStyle}>
                  The booking reference does not match our record
                  <br />
                  Please re-enter the correct booking reference
                  <br />
                  You have {attemptLimits - valCount} attempts left
                </Typography>
              )}
              <br />
              <Button style={{ ...btnStyle, color: 'green' }} onClick={this.handleClick}>
                VALIDATE
              </Button>
              <Button style={{ ...btnStyle, color: 'grey' }} onClick={this.handleClose}>
                CANCEL
              </Button>
            </div>
          </Modal>
        </MuiThemeProvider>
      </ResWrapper>
    ) : (
      <LoginReminder />
    ))
  }
}

export default ResVal

ResVal.propTypes = {
  login: PropTypes.bool
}
