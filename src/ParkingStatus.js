import React, { Component } from 'react'
import styled from 'styled-components'
import StatusTable from './StatusTable'
import StatusSummary from './StatusSummary'
import StatusLegend from './StatusLegend'

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
  padding: 1px 50px 1px 50px;
`

const LegendCell = styled.td`
  padding: 1px 20px 1px 50px;
`

class ParkingStatus extends Component {
  state = {
    stall: [
      {ID: 'A1', status: 'vacant', index: 0},
      {ID: 'A2', status: 'ocupied', index: 1},
      {ID: 'A3', status: 'vacant', index: 2},
      {ID: 'A4', status: 'ocupied', index: 3},
      {ID: 'A5', status: 'vacant', index: 4},
      {ID: 'B1', status: 'vacant', index: 5},
      {ID: 'B2', status: 'vacant', index: 6},
      {ID: 'B3', status: 'vacant', index: 7},
      {ID: 'B4', status: 'ocupied', index: 8},
      {ID: 'B5', status: 'reserved', index: 9},
    ],
  }
  render(){
    return(
      <Wrapper>
        <Table>
          <tbody>
            <Row>
              <SummaryCell><StatusSummary data={this.state.stall}/></SummaryCell>
              <StatusCell><StatusTable data={this.state.stall}/></StatusCell>
              <LegendCell><StatusLegend/></LegendCell>
            </Row>
          </tbody>
        </Table>
      </Wrapper>
    )
  }
}

export default ParkingStatus