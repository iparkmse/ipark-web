import React, { Component } from 'react'
import ParkingStatus from '../parkingInfo/ParkingStatus'
import LoginForm from '../userAuth/LoginForm'
import Spinner from '../util/Spinner'
import firebaseApp from '../../firebase'

const auth = firebaseApp.auth()

export default class NavHome extends Component {
  state = {
    login: null
  }
  
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      const isLogin = user ? true : false
      this.setState({ login: isLogin })
      console.log('login value is', this.state.login)
    })
  }

  render() {
    const { login } = this.state
    if (login === null) return (<Spinner />)
    return (login ? <ParkingStatus /> : <LoginForm />)
  }
}
