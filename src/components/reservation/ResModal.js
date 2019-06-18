import React, { Component, Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'


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

const stallOptions = ['A1', 'A2', 'A3']
const timeOptions = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

export default class ResModal extends Component {
  state = {
    open: false,
    stall: 'A1',
    plates: '',
    time: '7:00',
    hours: 0,
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { open } = this.state
    return (
      <Fragment>
        <button onClick={this.handleOpen}>Open modal</button>
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
              id='outlined-plates-input'
              label='Car Plates'
              type='text'
              name='plates'
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
              value={this.state.stall}
              onChange={this.handleChange}
              SelectProps={{
                native: true
              }}
              margin='normal'
              variant='outlined'
            >
              {stallOptions.map(stall => (
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
              value={this.state.time}
              onChange={this.handleChange}
              SelectProps={{
                native: true
              }}
              margin='normal'
              variant='outlined'
            >
              {timeOptions.map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </TextField>
          </form>
        </Modal>
      </Fragment>
    )
  }
}
