import React, { Component } from 'react'
import styled from 'styled-components'
import StatusTable from './StatusTable'
import StatusSummary from './StatusSummary'
import StatusLegend from './StatusLegend'
import Spinner from '../util/Spinner'
import firebaseApp from '../../firebase'

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.6);  // Black with Transparency of 40%
  display: inline-block;
  padding: 60px 130px;
`

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 221px 418px;
  grid-template-rows: 310px 113px;
`

const SummaryCell = styled.div`
  padding: 1px 50px 1px 20px;
`

const StatusCell = styled.div`
  padding: 1px 30px 1px 30px;
  grid-column: 2 / 3;
  grid-row: 1 / 3;
`

const LegendCell = styled.div`
  padding: 1px 50px 1px 20px;
`

const db = firebaseApp.database()

class ParkingStatus extends Component {
  state = {
    stalls: [],
    number: null, // the number of stalls
  }

  componentDidMount() {
    db.ref('stalls').once('value')
      .then(snapshot => {
        let stallsData = snapshot.val()
        let tmpArr = []
        for (let stall in stallsData) {
          tmpArr.push(stallsData[stall])
        }
        this.setState({
          stalls: tmpArr,
          number: tmpArr.length
        })
      }, err => console.log(err))
  }

  componentDidUpdate() {
    let copyStalls = this.state.stalls
    db.ref('stalls').on('child_changed', childSnapshot => {
      copyStalls[childSnapshot.val().index] = childSnapshot.val()
      this.setState({ stalls: copyStalls })
    }, err => console.log(err))
  }

  render(){
    if (
      this.state.stalls.length === this.state.number
      && !this.state.stalls.includes(undefined) // prevent StatusTable to crash when updating stalls
    ) {
      return (
        <Wrapper>
          <GridWrapper>
            <SummaryCell><StatusSummary data={this.state.stalls}/></SummaryCell>
            <StatusCell><StatusTable data={this.state.stalls}/></StatusCell>
            <LegendCell><StatusLegend/></LegendCell>
          </GridWrapper>
        </Wrapper>
      )
    }

    return <Spinner />
  }
}

export default ParkingStatus