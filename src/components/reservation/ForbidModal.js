import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import Typography from '@material-ui/core/Typography'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { DateContext } from '../../contexts/DateContext'


const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '200px',
  maxWidth: '100%',
  backgroundColor: 'white',
  padding: '32px',
  borderRadius: '10px',
  boxShadow: '0 3px 7px rgba(0, 0, 0, 0.3)',
  border: '1px solid rgba(0, 0, 0, 0.3)',
  textAlign: 'center'
}

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2196f3'}
  },
  typography: {
    useNextVariants: true,
  }
})

export default class ForbidModal extends Component {
  static contextType = DateContext
  state = {
    open: this.props.open
  }

  handleClose = () => {
    this.setState({ open: false })
    this.props.closeHandler()
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props
    if (oldProps.open !== newProps.open) {
      this.setState({ open: newProps.open })
    }
  }

  render() {
    const { open } = this.state
    return (
      <MuiThemeProvider theme={theme}>
        <Modal
          aria-labelledby='reservation-form-modal'
          aria-describedby='form-to-make-a-reservation'
          open={open}
          onClose={this.handleClose}
        >
          <form style={modalStyle}>
            <Typography variant='body1' id='forbid-modal-body'>
              Only 1 booking per day
            </Typography>
            <Button color='primary' onClick={this.handleClose} style={{marginTop: '15px'}}>OK</Button>
          </form>
        </Modal>
      </MuiThemeProvider>
    )
  }
}

ForbidModal.propTypes = {
  closeHandler: PropTypes.func,
  open: PropTypes.bool
}
