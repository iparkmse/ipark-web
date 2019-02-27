import React, { Component } from 'react'
import styled from 'styled-components'
import StatusTable from './StatusTable'
import StatusSummary from './StatusSummary'
import StatusLegend from './StatusLegend'
import firebaseApp from './firebase'

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.6);  // Black with Transparency of 40%
  width: 900px;
  padding: 60px 10px;
`

const Table = styled.table`
  margin: auto;
`

const Row = styled.tr`
  vertical-align: top;
`

const SummaryCell = styled.td`
  padding: 1px 50px 1px 20px;
`

const StatusCell = styled.td`
  padding: 1px 30px 1px 30px;
`

const LegendCell = styled.td`
  padding: 1px 20px 1px 50px;
`

const db = firebaseApp.database()

class ParkingStatus extends Component {
  state = {
    stalls: []
  }

  componentDidMount() {
    db.ref('stalls').once('value')
      .then(snapshot => {
        let stallsData = snapshot.val()
        let tmpArr = []
        for (let stall in stallsData) {
          tmpArr.push(stallsData[stall])
        }
        this.setState({ stalls: tmpArr })
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
    if (this.state.stalls.length) {
      return (
        <Wrapper>
          <Table>
            <tbody>
              <Row>
                <SummaryCell><StatusSummary data={this.state.stalls}/></SummaryCell>
                <StatusCell><StatusTable data={this.state.stalls}/></StatusCell>
                <LegendCell><StatusLegend/></LegendCell>
              </Row>
            </tbody>
          </Table>
        </Wrapper>
      )
    }

    return <div>Loading...</div>
  }
}

export default ParkingStatus