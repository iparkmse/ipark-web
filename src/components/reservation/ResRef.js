import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { modalStyle } from './ResModal'
import { stalls, times, timesDB } from './ResTable'
import firebaseApp from '../../firebase'

const headerStyle = {
  margin: '0px 0px 20px 0px',
  color: 'Green',
  fontWeight: 'bold',
  fontSize: '25px'
}

const bottonStyle = {
  margin: '20px 0px 0px 0px',
  color: 'Green',
  fontSize: '18px',
  fontWeight: 'bold'
}

const bodyStyle = {
  margin: '10px 0px 0px 0px',
  color: 'DarkSlateGray'
}

const theme = createMuiTheme({
  palette: {
    primary: { main: '#32CD32' }
  },
  typography: {
    useNextVariants: true,
  }
})

const db = firebaseApp.database()

class ResRef extends Component {
  state = {
    open: this.props.open,
    reference: ''
  }

  handleClose = () => {
    this.setState({ open: false })
    this.props.closeHandler()
  }

  getRef = () => {
    const { index, date } = this.props
    const stall = stalls[Math.floor(index / times.length)]
    const time = timesDB[index % times.length]
    db.ref(`reservation/${date}/stall${stall}/${time}`).once('value')
      .then(snapshot => {
        this.setState({ reference: snapshot.val().bookingRef })
      })
  }

  componentDidMount() {
    const { reference } = this.props
    if (reference) this.setState({ reference })
    else this.getRef()
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props
    if (oldProps.open !== newProps.open) {
      this.setState({ open: newProps.open })
    }
    if (newProps.date !== oldProps.date) {
      this.getRef()
    }
  }

  render(){
    const { open, reference } = this.state
    return(
      <MuiThemeProvider theme={theme}>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={this.handleClose}
        >
          <div style={{...modalStyle, textAlign: 'center'}}>
            <Typography variant="h6" id="modal-title" style={headerStyle}>
              SUCCESS!
            </Typography>
            <TextField
              label='Booking Reference'
              defaultValue={reference}
              autoFocus
              InputProps={{
                readOnly: true,
              }}
              inputProps={{
                style: { textAlign: 'center', letterSpacing: '10px', width: '200px',
                  fontSize: '30px', color: 'DarkSlateGray', fontWeight: 'bold' }
              }}
              InputLabelProps={{
                style: { color: 'LimeGreen' }
              }}
              variant='outlined'
            />
            <Typography variant="body2" id="modal-title" style={bodyStyle}>
              Please keep this reference number for booking validation
            </Typography>
            <br/>
            <Button style={bottonStyle} onClick={this.handleClose}>
              OK
            </Button>
          </div>
        </Modal>
      </MuiThemeProvider>
    )
  }
}

export default ResRef

ResRef.propTypes = {
  closeHandler: PropTypes.func,
  open: PropTypes.bool,
  index: PropTypes.number,
  date: PropTypes.string,
  reference: PropTypes.string
}
