import React, { Component } from 'react'
import styled from 'styled-components'
import StatusTable from './StatusTable'
import StatusSummary from './StatusSummary'
import StatusLegend from './StatusLegend'

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

class ParkingStatus extends Component {
  state = {
    stall: [
      {ID: 'A1', status: 'vacant', index: 0},
      {ID: 'A2', status: 'occupied', index: 1},
      {ID: 'A3', status: '', index: 2},
      {ID: 'A4', status: '', index: 3},
      {ID: 'A5', status: '', index: 4},
      {ID: 'B1', status: 'vacant', index: 5},
      {ID: 'B2', status: 'occupied', index: 6},
      {ID: 'B3', status: '', index: 7},
      {ID: 'B4', status: '', index: 8},
      {ID: 'B5', status: '', index: 9},
    ],
  }
  render(){
    return(
      <Wrapper>
        <GridWrapper>
          <SummaryCell><StatusSummary data={this.state.stall}/></SummaryCell>
          <StatusCell><StatusTable data={this.state.stall}/></StatusCell>
          <LegendCell><StatusLegend/></LegendCell>
        </GridWrapper>
      </Wrapper>
    )
  }
}

export default ParkingStatus