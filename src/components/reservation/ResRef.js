import React, {Component} from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { modalStyle } from './ResModal'


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

class ResRef extends Component {
  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({ open: true })
  }
  
  handleClose = () => {
    this.setState({ open: false })
  }

  render(){
    let RefNum = '0930'
    return(
      <MuiThemeProvider theme={theme}>
        <Typography gutterBottom>Placeholder for reserve button</Typography>
        <Button onClick={this.handleOpen}>Reserve</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={{...modalStyle, textAlign: 'center'}}>
            <Typography variant="h6" id="modal-title" style={headerStyle}>
              SUCCESS!
            </Typography>
            <TextField
              label='Booking Reference'
              defaultValue={RefNum}
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
