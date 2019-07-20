import styled from 'styled-components'
import { createMuiTheme } from '@material-ui/core/styles'

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

export { headerStyle, btnStyle, bodyStyle, theme }

const NoBookingDiv = styled.div`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
`

const ValidatedDiv = styled(NoBookingDiv)`
  color: green;
`

const ViolatedDiv = styled(NoBookingDiv)`
  color: red;
`

export { NoBookingDiv, ValidatedDiv, ViolatedDiv }
