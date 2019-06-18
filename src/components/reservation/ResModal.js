import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Modal from '@material-ui/core/Modal'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'


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
    plates: '',
    stall: 'A1',
    time: '7:00',
    hours: '1',
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
    const { open, plates, stall, time, hours } = this.state
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
              value={time}
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
            <Button color='primary' type='submit' style={{margin: '30px 10px 0 0'}}>RESERVE</Button>
            <Button style={{marginTop: 30}} onClick={this.handleClose}>CANCEL</Button>
          </form>
        </Modal>
      </Fragment>
    )
  }
}
