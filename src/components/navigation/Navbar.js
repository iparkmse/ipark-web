import React, { Component, Fragment }  from 'react'
import styled from 'styled-components'
import { NavLink, BrowserRouter, Route } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import NavHome from './NavHome'
import LoginForm from '../userAuth/LoginForm'
import SignupForm from '../userAuth/SignupForm'
import firebaseApp from '../../firebase'

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

let unsubscribeAuth
const auth = firebaseApp.auth()

export default class Navbar extends Component {
  state = {
    login: null
  }

  componentDidMount() {
    unsubscribeAuth = auth.onAuthStateChanged(user => {
      const isLogin = user ? true : false
      this.setState({ login: isLogin })
      console.log('login value is', this.state.login)
    })
  }

  componentWillUnmount() {
    unsubscribeAuth()
    console.log('Navbar unmounted')
  }

  logout = () => {
    auth.signOut().then(() => {
      console.log('user signed out')
    })
  }

  render() {
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
              <Button style={BtnStyle} onClick={this.logout}>Logout</Button>
            </Toolbar>
          </AppBar>
          <Route exact path='/' render={() => <NavHome login={this.state.login} />} />
          <Route path='/login' component={LoginForm} />
          <Route path='/signup' component={SignupForm} />
        </Fragment>
      </BrowserRouter>
    )
  }
}
