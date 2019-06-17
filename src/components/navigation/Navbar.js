import React, { Component, Fragment }  from 'react'
import styled from 'styled-components'
import { BrowserRouter, Route } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import NavContent from './NavContent'
import NavHome from './NavHome'
import LoginForm from '../userAuth/LoginForm'
import SignupForm from '../userAuth/SignupForm'
import ResMain from '../reservation/ResMain'
import Spinner from '../util/Spinner'
import firebaseApp from '../../firebase'

const ImgWrapper = styled.span`
  padding: 5px 5px 2px 5px;
  flex-grow: 1;
`
const BarStyle = {
  background: '#CEE2F3',
}

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
    })
  }

  componentWillUnmount() {
    unsubscribeAuth()
    console.log('Navbar unmounted')
  }

  render() {
    const { login } = this.state
    if (login === null) return (<Spinner />)
    return (
      <BrowserRouter>
        <Fragment>
          <AppBar position="fixed" style={BarStyle}>
            <Toolbar>
              <ImgWrapper>
                <img src={require('../../img/ipark_logo.png')} alt='ipark' />
              </ImgWrapper>
              <NavContent login={login} />
            </Toolbar>
          </AppBar>
          <Route exact path='/' render={() => <NavHome login={login} />} />
          <Route path='/login' render={() => <LoginForm login={login} />} />
          <Route path='/signup' render={() => <SignupForm login={login} />} />
          <Route path='/reservation' render={() => <ResMain login={login} />} />
        </Fragment>
      </BrowserRouter>
    )
  }
}
