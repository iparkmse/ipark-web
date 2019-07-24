import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Spinner from '../util/Spinner'
import firebaseApp from '../../firebase'

const BtnStyle = {
  fontSize: 20,
  color: '#1F3864',  // dark blue
  fontWeight: 'bold',
  margin: '5px',
}

const peruEffects = { textShadow: '0px 0px 15px peru, 0px 0px 15px peru' }

const auth = firebaseApp.auth()

export const logout = () => {
  auth.signOut().then(() => {
    console.log('user signed out')
  })
}

const NavContent = ({ login }) => {
  if (login === null) return (<Spinner />)
  return (login ? (
    <Fragment>
      <Button component={NavLink} exact to='/' style={BtnStyle} activeStyle={peruEffects}>Parking Status</Button>
      <Button component={NavLink} exact to='/reservation' style={BtnStyle} activeStyle={peruEffects}>reservation</Button>
      <Button style={BtnStyle} onClick={logout}>Logout</Button>
    </Fragment>
  ) : (
    <Fragment>
      <Button component={NavLink} exact to='/' style={BtnStyle} activeStyle={peruEffects}>Parking Status</Button>
      <Button component={NavLink} to='/login' style={BtnStyle} activeStyle={peruEffects}>Login</Button>
      <Button component={NavLink} to='/signup' style={BtnStyle} activeStyle={peruEffects}>Signup</Button>
    </Fragment>
  ))
}

NavContent.propTypes = {
  login: PropTypes.bool
}

export default NavContent
