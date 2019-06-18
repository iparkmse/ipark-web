import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import { Button } from '@storybook/react/demo'
import { text, color, object, boolean } from '@storybook/addon-knobs'
import StarIcon from '@material-ui/icons/Stars'
import BackupIcon from '@material-ui/icons/Backup'

// userAuth components
import LoginForm from '../src/components/userAuth/LoginForm'
import SignupForm from '../src/components/userAuth/SignupForm'
import LoginReminder from '../src/components/userAuth/LoginReminder'

// navigation components
import Navbar from '../src/components/navigation/Navbar'

// parkingInfo components
import ParkingStatus from '../src/components/parkingInfo/ParkingStatus'

// reservation components
import ResCalendar from '../src/components/reservation/ResCalendar'
import ResMain from '../src/components/reservation/ResMain'
import ResModal from '../src/components/reservation/ResModal'


let buttonStyle = {
  backgroundColor: 'green',
  color: 'red',
  borderRadius: 2
}

storiesOf('Button', module)
  .addWithJSX('tom test', () => (
    <button
      disabled={boolean('Disabled', false)}
      style={{backgroundColor: color('Color', 'yellow')}}
    >
      {text('Label', 'hahaFun')}
    </button>
  )
  )
  .addWithJSX('with text', () => <button style={object('Style', buttonStyle)}>{text('Label', 'hello')}</button>)
  .add('with some emoji', () => (
    <Button>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))

storiesOf('Material-UI icon', module)
  .addWithJSX('star icon', () => <StarIcon>Outlined</StarIcon>)
  .addWithJSX('backup icon', () => <BackupIcon>Filled</BackupIcon>)

storiesOf('React Component', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Login form V1', () => <LoginForm />)
  .add('Signup form V1', () => <SignupForm />)
  .add('Login Reminder', () => <LoginReminder />)

  .add('Parking Status Table', () => <ParkingStatus />)

  .add('Navigation bar', () => <Navbar />)

  .add('Reservation calendar', () => <ResCalendar />)
  .add('Reservation main page', () => <ResMain login={true} />)
  .add('Reservation modal', () => <ResModal open={true} />)
