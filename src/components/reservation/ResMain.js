import React, { Component, Fragment } from 'react'
import ResCalendar from './ResCalendar'
import { reformattedDays } from './ResCalendar'
import ResTable from './ResTable'
import RES_DATA from './res_data'
import firebaseApp from '../../firebase'

const db = firebaseApp.database()
const dayLength = reformattedDays.length

export default class ResMain extends Component {
  updateRes = (ResCalendarData, index) => {
    this.setState({
      date: ResCalendarData,
      resData: this.state.dbData[index]
    })
  }

  state = {
    date: reformattedDays[0],
    resData: null,
    dbData: new Array(dayLength)  // reservation data for X days on database [ {}, ..., {} ]
  }

  componentDidMount() {
    let tempDbData = new Array(dayLength)
    reformattedDays.forEach((day, i) => {
      const reservationRef = db.ref(`reservation/${day}`)
      reservationRef.once('value')
        .then(snapshot => {
          if (!snapshot.exists()) {
            reservationRef.set(RES_DATA)
            tempDbData[i] = RES_DATA
            console.log('created data for', day)
          }
          else tempDbData[i] = snapshot.val()
          if (i === dayLength - 1) {
            console.log(tempDbData)
            this.setState({
              resData: tempDbData[0],
              dbData: tempDbData
            })
          }
        })
    })
  }

  componentDidUpdate() {
    reformattedDays.forEach(day => {
      let copy = this.state.dbData  // ds: [ {}, ..., {} ]
      const reservationRef = db.ref(`reservation/${day}`)
      reservationRef.on('child_changed', childSnapshot => {
        console.log(childSnapshot.val().a7)
        console.log(childSnapshot.val())
      })
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
