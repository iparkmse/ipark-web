import React, { Component } from 'react'
import StatusTable from './StatusTable'

class ParkingStatus extends Component {
  state = {
    stall: [
      {ID: 'A1', status: 'Vacant', id: 1},
      {ID: 'A2', status: 'Ocupied', id: 2},
      {ID: 'A3', status: 'Vacant', id: 3},
      {ID: 'A4', status: 'Ocupied', id: 4},
      {ID: 'A5', status: 'Vacant', id: 5},
      {ID: 'B1', status: 'Vacant', id: 6},
      {ID: 'B2', status: 'Vacant', id: 7},
      {ID: 'B3', status: 'Vacant', id: 8},
      {ID: 'B4', status: 'Ocupied', id: 9},
      {ID: 'B5', status: 'Ocupied', id: 10},
    ]
  }
  render(){
    return(
      <StatusTable data={this.state.stall}/>
    )
  }
}

export default ParkingStatus