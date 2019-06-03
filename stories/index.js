import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button } from '@storybook/react/demo'
import { text, color, object, boolean, number } from '@storybook/addon-knobs'
import StarIcon from '@material-ui/icons/Stars'
import BackupIcon from '@material-ui/icons/Backup'

import LoginForm from '../src/components/userAuth/LoginForm'
import SignupForm from '../src/components/userAuth/SignupForm'
import Navbar from '../src/components/navigation/Navbar'
import NavItem from '../src/components/navigation/NavItem'
import ParkingStatus from '../src/components/parkingInfo/ParkingStatus'

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

storiesOf('Span', module)
  .addWithJSX('span with number', () => <span>{number('Age', 78)}</span>)

storiesOf('Material-UI icon', module)
  .addWithJSX('star icon', () => <StarIcon>Outlined</StarIcon>)
  .addWithJSX('backup icon', () => <BackupIcon>Filled</BackupIcon>)

storiesOf('React Component', module)
  .add('Login form V1', () => (
    <LoginForm />
  ))
  .add('Signup form V1', () => (
    <SignupForm />
  ))
  .add('Parking Status Table', () => (
    <ParkingStatus />
  ))
  .add('Navigation bar', () => (
    <Navbar />
  ))
  .add('Navigation item', () => (
    <NavItem itemTitle='login' itemContent={<LoginForm />} />
  ))
