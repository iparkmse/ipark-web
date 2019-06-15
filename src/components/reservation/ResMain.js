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
          }
          else tempDbData[i] = snapshot.val()
          if (i === dayLength - 1) {
            this.setState({
              resData: tempDbData[0],
              dbData: tempDbData
            })
          }
        })
    })
  }

  componentDidUpdate() {
    let copy = this.state.dbData  // ds: [ {}, ..., {} ]
    reformattedDays.forEach((day, i) => {
      const reservationRef = db.ref(`reservation/${day}`)
      reservationRef.on('child_changed', childSnapshot => {
        const stallName = childSnapshot.key  // i.e. stallA1
        copy[i][stallName] = childSnapshot.val()
        this.setState({ dbData: copy })
      })
    })
  }

  componentWillUnmount() {
    reformattedDays.forEach(day => {
      db.ref(`reservation/${day}`).off()
    })
  }

  render() {
    const { date, resData } = this.state

    return (
      <Fragment>
        <ResCalendar resMainHandler={this.updateRes}/>
        <ResTable date={date} resData={resData}/>
      </Fragment>
    )
  }
}
