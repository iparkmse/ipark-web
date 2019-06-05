import React, { Fragment }  from 'react'
import styled from 'styled-components'
import { NavLink, BrowserRouter, Route } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import NavHome from './NavHome'
import LoginForm from '../userAuth/LoginForm'
import SignupForm from '../userAuth/SignupForm'

const ImgWrapper = styled.span`
  padding: 5px 5px 2px 5px;
  flex-grow: 1;
`

const BtnStyle = {
  fontSize: 20,
  color: '#1F3864',  // dark blue
  fontWeight: 'bold',
  margin: '5px',
}

const BarStyle = {
  background: '#CEE2F3',
}

const peruEffects = { textShadow: '0px 0px 15px peru, 0px 0px 15px peru' }

const Navbar = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <AppBar position="fixed" style={BarStyle}>
          <Toolbar>
            <ImgWrapper>
              <img src={require('../../img/ipark_logo.png')} alt='missing image' />
            </ImgWrapper>
            <Button component={NavLink} exact to='/' style={BtnStyle} activeStyle={peruEffects}>Parking Status</Button>
            <Button component={NavLink} to='/login' style={BtnStyle} activeStyle={peruEffects}>Login</Button>
            <Button component={NavLink} to='/signup' style={BtnStyle} activeStyle={peruEffects}>Signup</Button>
          </Toolbar>
        </AppBar>
        <Route exact path='/' component={NavHome} />
        <Route path='/login' component={LoginForm} />
        <Route path='/signup' component={SignupForm} />
      </Fragment>
    </BrowserRouter>
  )
}

export default Navbar
