import React, { Component, Fragment } from 'react'
import ResCalendar from './ResCalendar'
import { reformattedDays } from './ResCalendar'
import ResTable from './ResTable'
import RES_DATA from './res_data'
import firebaseApp from '../../firebase'

const db = firebaseApp.database()

export default class ResMain extends Component {
  state = {
    date: reformattedDays[0],
    resData: null
  }

  componentDidMount() {
    reformattedDays.forEach(day => {
      const reservationRef = db.ref(`reservation/${day}`)
      reservationRef.once('value')
        .then(snapshot => {
          if (!snapshot.exists()) {
            reservationRef.set(RES_DATA)
            console.log('created data for', day)
          }
        })
    })
    db.ref(`reservation/${reformattedDays[0]}`).once('value')
      .then(snapshot => this.setState({ resData: snapshot.val()}))
  }

  getDate = ResCalendarData => {
    this.setState({ date: ResCalendarData })
  }

  render() {
    const { date, resData } = this.state

    return (
      <Fragment>
        <ResCalendar resMainHandler={this.getDate}/>
        <p>{date}</p>
        <ResTable resData={resData}/>
      </Fragment>
    )
  }
}
