import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Table = styled.table`
  border-collapse: collapse;
  text-align: center;
  font-family: 'Gill Sans', sans-serif;
`

const CellHeader = styled.td`
  color: NavajoWhite;
  border: none;
  font-size: 26px;
  padding: 1px 10px 1px 10px;
  letter-spacing: 1px;
`

const CellGreen = styled.td`
  border: 3px solid #666666;
  padding: 4px 10px 4px 10px;
  font-size: 22px;
  background: ForestGreen;
`

const CellYellow = styled(CellGreen)`
  background: gold;
`

const CellRed = styled(CellGreen)`
  background: red;
`

const CellMaroon = styled(CellGreen)`
  background: maroon;
  color: white;
`

const CellBlack = styled(CellGreen)`
  background: black;
  color: white;
`

const StatusSummary = ({data}) => {
  let vacant = 0
  let occupied = 0
  let reserved = 0
  let expiring = 0
  let violated = 0
  data.forEach(d => {
    if (d.status === 'vacant') {
      vacant++
    }
    else if (d.status === 'occupied') {
      occupied++
    }
    else if (d.status === 'reserved') {
      reserved++
    }
    else if (d.status === 'expiring') {
      expiring++
    }
    else if (d.status === 'violated') {
      violated++
    }
  })

  return(
    <Table>
      <thead>
        <tr>
          <CellHeader colSpan='2'>SUMMARY</CellHeader>
        </tr>
      </thead>
      <tbody>
        <tr>
          <CellGreen>vacant</CellGreen><CellGreen>{vacant}</CellGreen>
        </tr>
        <tr>
          <CellYellow>reserved</CellYellow><CellYellow>{reserved}</CellYellow>
        </tr>
        <tr>
          <CellRed>occupied</CellRed><CellRed>{occupied}</CellRed>
        </tr>
        <tr>
          <CellMaroon>expiring</CellMaroon><CellMaroon>{expiring}</CellMaroon>
        </tr>
        <tr>
          <CellBlack>violated</CellBlack><CellBlack>{violated}</CellBlack>
        </tr>
      </tbody>
    </Table>
  )
}

StatusSummary.propTypes = {
  data: PropTypes.array.isRequired
}

export default StatusSummary