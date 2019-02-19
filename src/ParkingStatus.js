import React, { Component } from 'react'

class ParkingStatus extends Component {
  // state = {
  //    stall = {
  //        { stall_id}
  //    }
  // }
  render(){
    return(
      <table>
        <thead>
          <tr>
            <th>PARKING STATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <label>A1</label>
              <br/>
              <label>Status: </label>
            </td>
            <td>
              <label>B1</label>
              <br/>
              <label>Status: </label>
            </td>
          </tr>
          <tr>
            <td>
              <label>A2</label>
              <br/>
              <label>Status: </label>
            </td>
            <td>
              <label>B2</label>
              <br/>
              <label>Status: </label>
            </td>
          </tr>
          <tr>
            <td>
              <label>A3</label>
              <br/>
              <label>Status: </label>
            </td>
            <td>
              <label>B3</label>
              <br/>
              <label>Status: </label>
            </td>
          </tr>
          <tr>
            <td>
              <label>A4</label>
              <br/>
              <label>Status: </label>
            </td>
            <td>
              <label>B4</label>
              <br/>
              <label>Status: </label>
            </td>
          </tr>
          <tr>
            <td>
              <label>A5</label>
              <br/>
              <label>Status: </label>
            </td>
            <td>
              <label>B5</label>
              <br/>
              <label>Status: </label>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default ParkingStatus