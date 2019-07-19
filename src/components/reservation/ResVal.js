import React, {Component} from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { LinkWrapper, ResWrapper, BtnWrapper } from './constants'
import { ResValLink, ResTodayLink } from './ResLink'
import { modalStyle } from './ResModal'


const headerStyle = {
  margin: '0px 0px 20px 0px',
  fontWeight: 'bold',
  fontSize: '25px'
}

const btnStyle = {
  margin: '20px 0px 0px 0px',
  fontSize: '18px',
  fontWeight: 'bold'
}

const bodyStyle = {
  margin: '10px 0px 0px 0px',
  color: 'red',
  fontSize: '12px'
}

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2196F3' }
  },
  typography: {
    useNextVariants: true,
  }
})

const BookRef = '0930'  // TODO: get the BookRef from firebase

class ResVal extends Component {
  state = {
    open: false,
    error: false,
    input: ''
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClick = () => {
    const { input } = this.state
    this.setState({ error: input !== BookRef }, () => {
      if (!this.state.error){
        this.setState({ open: false })
        this.setState({ input: '' })
      }
    })
  }

  handleClose = () => {
    this.setState({ open: false })
    this.setState({ input: '' })
    this.setState({ error: false })
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value })
  }

  render() {
    const { open, error, input } = this.state
    return(
      <ResWrapper>
        <LinkWrapper>
          <ResValLink />
          <ResTodayLink />
        </LinkWrapper>
        <MuiThemeProvider theme={theme}>
          <BtnWrapper>
            <Button style={{ ...btnStyle, fontSize: '16px' }} onClick={this.handleOpen}>
              Validate my booking
            </Button>
          </BtnWrapper>
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
                  <br/>
                  Please re-enter the correct booking reference
                </Typography>
              )}
              <br/>
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
    )
  }
}

export default ResVal
