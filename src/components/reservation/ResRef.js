import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const WrapperTextField = styled.div`
  
`

const ResRef = () => {
  return(
    <WrapperTextField>
      <Typography variant='h6' gutterBottom>Reservation Successful</Typography>
      <TextField
        label="Booking Reference"
        defaultValue='Reference Num'
        InputProps={{
          readOnly: true,
        }}
        inputProps={{
          style: { textAlign: 'center'}
        }}
        variant='outlined'
      />
      <br/>
      <Button>CLOSE</Button>
    </WrapperTextField>
  )
}

export default ResRef