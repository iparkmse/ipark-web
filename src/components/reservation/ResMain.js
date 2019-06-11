import React, { Component, Fragment } from 'react'
import ResCalendar from './ResCalendar'
import { reformattedDays } from './ResCalendar'
import ResTable from './ResTable'
import RES_DATA from './res_data'
import firebaseApp from '../../firebase'

const db = firebaseApp.database()
const reservationRef = db.ref('reservation/Jun13')
reservationRef.once('value')
  .then(snapshot => {
    if (!snapshot.child('Jun13').exists()) {
      reservationRef.set(RES_DATA)
    }
  })

export default class ResMain extends Component {
  state = {
    date: reformattedDays[0]
  }

  getDate = ResCalendarData => {
    this.setState({ date: ResCalendarData })
  }

  render() {
    return (
      <Fragment>
        <ResCalendar resMainHandler={this.getDate}/>
        <p>{this.state.date}</p>
        <ResTable />
      </Fragment>
    )
  }
}
