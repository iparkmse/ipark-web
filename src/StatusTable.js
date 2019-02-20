import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Table = styled.table`
  border: 1px solid black;
  border-collapse: collapse;
`

const TableR = styled.tr`
  border: 1px solid black;
  border-collapse: collapse;
`
const TableD = styled.td`
  border: 1px solid black;
  border-collapse: collapse;
`

const StatusTable = ({data}) => {
  const ind = Array.from(Array(data.length/2).keys())
  return(
    <Table>
      <thead>
        <TableR>
          <th colSpan='4'>PARKING STATUS</th>
        </TableR>
      </thead>
      <tbody>
        {
          ind.map(i => {
            return(
              <TableR key={data[i].id}>
                <TableD>{data[i].ID}  {data[i].status}</TableD>
                <TableD>{data[i+5].ID}  {data[i+5].status}</TableD>
              </TableR>
            )
          })
        }
      </tbody>
    </Table>
  )
}

StatusTable.propTypes = {
  data: PropTypes.array
}

export default StatusTable
