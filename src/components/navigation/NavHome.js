import React from 'react'
import PropTypes from 'prop-types'
import ParkingStatus from '../parkingInfo/ParkingStatus'
import LoginForm from '../userAuth/LoginForm'
import Spinner from '../util/Spinner'

const NavHome = ({login}) => {
  if (login === null) return (<Spinner />)
  return (login ? <ParkingStatus /> : <LoginForm />)
}

NavHome.propTypes = {
  login: PropTypes.bool
}

export default NavHome
