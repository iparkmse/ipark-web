import React, { Component } from 'react'
import ParkingStatus from '../parkingInfo/ParkingStatus'
import LoginForm from '../userAuth/LoginForm'
import Spinner from '../util/Spinner'
import firebaseApp from '../../firebase'

let unsubscribeAuth
const auth = firebaseApp.auth()

export default class NavHome extends Component {
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
    console.log('NavHome unmounted')
  }

  render() {
    const { login } = this.state
    if (login === null) return (<Spinner />)
    return (login ? <ParkingStatus /> : <LoginForm />)
  }
}
