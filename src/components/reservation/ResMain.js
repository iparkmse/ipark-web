import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ResCalendar from './ResCalendar'
import { reformattedDays } from './ResCalendar'
import ResTable from './ResTable'
import RES_DATA from './res_data'
import LoginReminder from '../userAuth/LoginReminder'
import Spinner from '../util/Spinner'
import { DateContextProvider } from '../../contexts/DateContext'
import firebaseApp from '../../firebase'

const db = firebaseApp.database()
const dayLength = reformattedDays.length

const Wrapper = styled.div`
  margin-top: 60px;
`

export default class ResMain extends Component {
  updateRes = (ResCalendarData, index) => {
    this.setState({
      index: index,
      date: ResCalendarData,
      resData: {...this.state.dbData[index]}
    })
  }

  state = {
    index: 0,
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
              resData: {...tempDbData[0]},
              dbData: [...tempDbData]
            })
          }
        })
    })

    reformattedDays.forEach((day, i) => {
      const reservationRef = db.ref(`reservation/${day}`)
      reservationRef.on('child_changed', childSnapshot => {
        const stallName = childSnapshot.key  // i.e. stallA1
        const copy = [...this.state.dbData]
        copy[i][stallName] = childSnapshot.val()
        this.setState({ dbData: [...copy] })
        if (i === this.state.index) {
          this.setState({ resData: {...copy[i]} })
        }
      })
    })
  }

  componentWillUnmount() {
    reformattedDays.forEach(day => {
      db.ref(`reservation/${day}`).off()
    })
  }

  render() {
    const { login } = this.props
    const { date, resData } = this.state

    if (login === null) return (<Spinner />)
    return (login ? (
      <Wrapper>
        <ResCalendar resMainHandler={this.updateRes} />
        <DateContextProvider value={date}>
          <ResTable date={date} resData={resData} />
        </DateContextProvider>
      </Wrapper>
    ) : (
      <LoginReminder />
    ))
  }
}

ResMain.propTypes = {
  login: PropTypes.bool
}
