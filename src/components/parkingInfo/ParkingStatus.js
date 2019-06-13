import React, { Component } from 'react'
import styled from 'styled-components'
import StatusTable from './StatusTable'
import StatusSummary from './StatusSummary'
import StatusLegend from './StatusLegend'
import Spinner from '../util/Spinner'
import firebaseApp from '../../firebase'

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.6);  /* Black with Transparency of 40% */
  display: inline-block;
  padding: 60px 0;
  width: 100%;
  height: 80vh;
`

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 221px 418px;
  grid-template-rows: 310px 113px;
  justify-content: center;
  margin-top: 20px;
`

const SummaryCell = styled.div`
  padding: 1px 50px 1px 20px;
`

const StatusCell = styled.div`
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
        const stallsData = snapshot.val()  // {stallA1: {...}, stallA2: {...}, ..., stallB5: {...}}
        const stallsArr = Object.values(stallsData)
        this.setState({
          stalls: stallsArr,
          number: stallsArr.length
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

  componentWillUnmount() {
    db.ref('stalls').off()
  }

  render(){
    const { stalls, number } = this.state
    if (
      stalls.length === number
      && !stalls.includes(undefined) // prevent StatusTable to crash when updating stalls
    ) {
      return (
        <Wrapper>
          <GridWrapper>
            <SummaryCell><StatusSummary data={stalls}/></SummaryCell>
            <StatusCell><StatusTable data={stalls}/></StatusCell>
            <LegendCell><StatusLegend/></LegendCell>
          </GridWrapper>
        </Wrapper>
      )
    }

    return <Spinner />
  }
}

export default ParkingStatus