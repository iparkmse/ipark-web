import React from 'react'
import PropTypes from 'prop-types'
import ParkingStatus from '../parkingInfo/ParkingStatus'
import LoginReminder from '../userAuth/LoginReminder'
import Spinner from '../util/Spinner'

const NavHome = ({login}) => {
  if (login === null) return (<Spinner />)
  return (login ? <ParkingStatus /> : <LoginReminder />)
}

NavHome.propTypes = {
  login: PropTypes.bool
}

export default NavHome
