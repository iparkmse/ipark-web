import React, { Component, Fragment } from 'react'
import ResCalendar from './ResCalendar'
import { reformattedDays } from './ResCalendar'
import ResTable from './ResTable'
import RES_DATA from './res_data'
import firebaseApp from '../../firebase'

const db = firebaseApp.database()
const dayLength = reformattedDays.length

export default class ResMain extends Component {
  state = {
    date: reformattedDays[0],
    resData: null,
    dbData: new Array(dayLength)
  }

  componentDidMount() {
    let i = 0
    let tempDbData = new Array(dayLength)
    reformattedDays.forEach(day => {
      const reservationRef = db.ref(`reservation/${day}`)
      reservationRef.once('value')
        .then(snapshot => {
          if (!snapshot.exists()) {
            reservationRef.set(RES_DATA)
            tempDbData[i++] = RES_DATA
            console.log('created data for', day)
          }
          else tempDbData[i++] = snapshot.val()
          if (i === dayLength) {
            this.setState({
              resData: tempDbData[0],
              dbData: tempDbData
            })
          }
        })
    })
  }

  updateRes = (ResCalendarData, index) => {
    this.setState({
      date: ResCalendarData,
      resData: this.state.dbData[index]
    })
  }

  render() {
    const { date, resData } = this.state

    return (
      <Fragment>
        <ResCalendar resMainHandler={this.updateRes}/>
        <p>{date}</p>
        <ResTable resData={resData}/>
      </Fragment>
    )
  }
}
