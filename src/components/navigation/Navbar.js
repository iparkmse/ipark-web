import React, { Component }  from 'react'
import styled from 'styled-components'
import { BrowserRouter, Route } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import NavContent from './NavContent'
import NavDrawer from './NavDrawer'
import NavHome from './NavHome'
import LoginForm from '../userAuth/LoginForm'
import ForgotPass from '../userAuth/ForgotPass'
import SignupForm from '../userAuth/SignupForm'
import ResMain from '../reservation/ResMain'
import ResToday from '../reservation/ResToday'
import ResVal from '../reservation/ResVal'
import Spinner from '../util/Spinner'
import { CredContextProvider } from '../../contexts/CredContext'
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
const db = firebaseApp.database()

export default class Navbar extends Component {
  state = {
    login: null,
    myUid: null,
    plates: null,
    isLargeScreen: null,
  }

  componentDidMount() {
    unsubscribeAuth = auth.onAuthStateChanged(user => {
      const isLogin = user ? true : false
      const uid = user? user.uid : null
      this.setState({
        login: isLogin,
        myUid: uid
      })
      if (uid && !this.state.plates) {
        db.ref(`users/${uid}`).once('value')
          .then(snapshot => {
            this.setState({ plates: snapshot.val().licensePlate })
          })
      }
    })
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  componentWillUnmount() {
    unsubscribeAuth()
    window.removeEventListener('resize', this.handleResize)
    console.log('Navbar unmounted')
  }

  handleResize = () => {
    const mediaQuery = window.matchMedia('(min-width: 705px)')
    this.setState({ isLargeScreen: mediaQuery.matches })
  }

  render() {
    const { login, isLargeScreen } = this.state
    if (login === null) return (<Spinner />)
    return (
      <BrowserRouter>
        <CredContextProvider value={{...this.state}}>
          <AppBar position="fixed" style={BarStyle}>
            <Toolbar>
              <ImgWrapper>
                <img src={require('../../img/ipark_logo.png')} alt='ipark' />
              </ImgWrapper>
              {isLargeScreen ? <NavContent login={login} /> : <NavDrawer login={login} />}
            </Toolbar>
          </AppBar>
          <Route exact path='/' render={() => <NavHome login={login} />} />
          <Route path='/login' render={() => <LoginForm login={login} />} />
          <Route path='/forgot-password' render={() => <ForgotPass />} />
          <Route path='/signup' render={() => <SignupForm login={login} />} />
          <Route path='/reservation' render={() => <ResMain login={login} />} />
          <Route path='/validation' render={() => <ResVal login={login} />} />
          <Route path='/today' render={() => <ResToday login={login} />} />
        </CredContextProvider>
      </BrowserRouter>
    )
  }
}
