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
  padding: 10px 10px 10px 10px;
  font-size: 22px;
  background: mediumseagreen;
`

const CellYellow = styled(CellGreen)`
  background: goldenrod;
`

const CellRed = styled(CellGreen)`
  background: indianred;
`

const StatusSummary = ({data}) => {
  let vacant = 0
  let occupied = 0
  let reserved = 0
  data.map(d => {
    if (d.status == 'vacant') {
      vacant++
    }
    else if (d.status == 'occupied') {
      occupied++
    }
    else if (d.status == 'reserved') {
      reserved++
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
      </tbody>
    </Table>
  )
}

StatusSummary.propTypes = {
  data: PropTypes.array.isRequired
}

export default StatusSummary