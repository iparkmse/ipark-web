import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { LinkWrapper, today, ResWrapper } from './constants'
import RES_DATA from './res_data'
import { ResValLink, ResTodayLink } from './ResLink'
import ResTable from './ResTable'
import LoginReminder from '../userAuth/LoginReminder'
import Spinner from '../util/Spinner'
import firebaseApp from '../../firebase'

const db = firebaseApp.database()

export default class ResToday extends Component {
  state = {
    resData: null  // reservation data for today on database; format: {}
  }

  componentDidMount() {
    const reservationRef = db.ref(`reservation/${today}`)
    reservationRef.once('value')
      .then(snapshot => {
        if (!snapshot.exists()) {
          reservationRef.set(RES_DATA)
          this.setState({ resData: RES_DATA })
        }
        else this.setState({ resData: snapshot.val() })
      })
  }

  render() {
    const { login } = this.props
    const { resData } = this.state
    if (login === null) return (<Spinner />)
    return (login ? (
      <ResWrapper>
        <LinkWrapper>
          <ResValLink />
          <ResTodayLink />
        </LinkWrapper>
        <ResTable date={today} resData={resData} />
      </ResWrapper>
    ) : (
      <LoginReminder />
    ))
  }
}

ResToday.propTypes = {
  login: PropTypes.bool
}
