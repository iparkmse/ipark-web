import React from 'react'
import styled from 'styled-components'

const DotGreen = styled.label`
  height: 25px;
  width: 25px;
  background-color: ForestGreen;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
`

const DotRed = styled(DotGreen)`
  background-color: red;
`

const DotYellow = styled(DotGreen)`
  background-color: gold;
`

const Table = styled.table`
  border-collapse: collapse;
  font-family: 'Gill Sans', sans-serif;
  font-size: 18px;
`

const Cell = styled.td`
  padding: 5px 5px 5px 5px;
  color: navajowhite;
`

const StatusLegend = () => {
  return(
    <div>
      <Table>
        <tbody>
          <tr>
            <Cell><DotGreen/></Cell><Cell>Vacant</Cell>
          </tr>
          <tr>
            <Cell><DotYellow/></Cell><Cell>Reserved</Cell>
          </tr>
          <tr>
            <Cell><DotRed/></Cell><Cell>Occupied</Cell>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default StatusLegend