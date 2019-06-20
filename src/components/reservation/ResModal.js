import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Modal from '@material-ui/core/Modal'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { stalls, times, timesDB } from './ResTable'
import { DateContext } from '../../contexts/DateContext'
import firebaseApp from '../../firebase'


const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  maxWidth: '100%',
  backgroundColor: 'white',
  padding: '32px',
  borderRadius: '10px',
  boxShadow: '0 3px 7px rgba(0, 0, 0, 0.3)',
  border: '1px solid rgba(0, 0, 0, 0.3)'
}

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2196f3'}
  },
  typography: {
    useNextVariants: true,
  }
})

const db = firebaseApp.database()

export default class ResModal extends Component {
  static contextType = DateContext
  state = {...this.props}

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
    this.props.closeHandler()
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  verifyReq = async () => {
    const date = this.context
    const index = times.indexOf(this.state.time)
    const cond1 = index + Number(this.state.hours) <= times.length
    let i = 0
    let cond2 = true && cond1
    while (i < this.state.hours && cond2) {
      const time = timesDB[index + i]
      const snapshot = await db.ref(`reservation/${date}/stall${this.state.stall}/${time}`).once('value')
      cond2 = snapshot.val().uid === ''
      i++
    }
    return cond2
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = await this.verifyReq()

    if (isValid) {
      const { stall, plates, myUid } = this.state
      const date = this.context
      const index = times.indexOf(this.state.time)
      let i = 0
      this.handleClose()

      while (i < this.state.hours) {
        const time = timesDB[index + i]
        db.ref(`reservation/${date}/stall${stall}/${time}`).update({
          plates: plates,
          uid: myUid
        })
        i++
      }
    }

    else {
      console.log('request invalid')
    }
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props
    if (oldProps.plates !== newProps.plates) {
      this.setState({ plates: newProps.plates })
    }
    if (oldProps.myUid !== newProps.myUid) {
      this.setState({ myUid: newProps.myUid })
    }
    if (oldProps.open !== newProps.open) {
      this.setState({
        open: newProps.open,
        time: newProps.time,
        stall: newProps.stall,
      })
    }
  }

  render() {
    const { open, plates, stall, time, hours } = this.state
    return (
      <MuiThemeProvider theme={theme}>
        <Modal
          aria-labelledby='reservation-form-modal'
          aria-describedby='form-to-make-a-reservation'
          open={open}
          onClose={this.handleClose}
        >
          <form style={modalStyle}>
            <Typography variant='h6' id='modal-title'>
              Make a reservation
            </Typography>
            <TextField
              id='outlined-input-plates'
              label='Car Plates'
              type='text'
              name='plates'
              value={plates}
              onChange={this.handleChange}
              margin='normal'
              variant='outlined'
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id='outlined-select-stall'
              select
              style={{width: 100, marginLeft: 10}}
              label='Stall Select'
              name='stall'
              value={stall}
              onChange={this.handleChange}
              SelectProps={{
                native: true
              }}
              margin='normal'
              variant='outlined'
            >
              {stalls.map(stall => (
                <option key={stall} value={stall}>
                  {stall}
                </option>
              ))}
            </TextField>
            <br />
            <TextField
              id='outlined-select-time'
              select
              label='Time Select'
              name='time'
              value={time}
              onChange={this.handleChange}
              SelectProps={{
                native: true
              }}
              margin='normal'
              variant='outlined'
            >
              {times.map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </TextField>
            <FormControl component="fieldset" style={{margin: '10px 0 0 20px'}}>
              <FormLabel component="legend" style={{fontSize: 12}}>Hours</FormLabel>
              <RadioGroup
                aria-label="Hours"
                name="hours"
                value={hours}
                onChange={this.handleChange}
                row
              >
                <FormControlLabel value='1' control={<Radio color='primary' />} label="1" />
                <FormControlLabel value='2' control={<Radio color='primary' />} label="2" />
                <FormControlLabel value='3' control={<Radio color='primary' />} label="3" />
              </RadioGroup>
            </FormControl>
            <br />
            <Button color='primary' type='submit' style={{margin: '30px 10px 0 0'}} onClick={this.handleSubmit}>RESERVE</Button>
            <Button style={{marginTop: 30}} onClick={this.handleClose}>CANCEL</Button>
          </form>
        </Modal>
      </MuiThemeProvider>
    )
  }
}

ResModal.propTypes = {
  closeHandler: PropTypes.func
}
