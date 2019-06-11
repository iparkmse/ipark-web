import React, { Component, Fragment } from 'react'
import ResCalendar from './ResCalendar'
import { dayOne } from './ResCalendar'
import ResTable from './ResTable'

export default class ResMain extends Component {
  state = {
    date: dayOne
  }

  getDate = ResCalendarData => {
    this.setState({ date: ResCalendarData })
  }

  render() {
    return (
      <Fragment>
        <ResCalendar resMainHandler={this.getDate}/>
        <ResTable />
      </Fragment>
    )
  }
}
