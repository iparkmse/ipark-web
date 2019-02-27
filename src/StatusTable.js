import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import StallStatus from './StallStatus'

const Table = styled.table`
  border-collapse: collapse;
  text-align: center;
  font-family: 'Gill Sans', sans-serif;
  /* margin-left: auto;
  margin-right: auto; */
`

const LeftColumn = styled.td`
  border-left: none;
  border-right: 5px solid whitesmoke;
  border-bottom: 5px solid whitesmoke;
  border-top: 5px solid whitesmoke;
  padding: 10px 30px 10px 20px;
`

const RightColumn = styled(LeftColumn)`
  border-left: 5px solid whitesmoke;
  border-right: none;
  padding: 10px 20px 10px 30px;
`

const LabelTitle = styled.label`
  color: NavajoWhite;
  font-size: 28px;
  letter-spacing: 1px;
`

const LabelStallID = styled.label`
  color: NavajoWhite;
  font-size: 28px;
  padding: 10px 20px 10px 20px;
  vertical-align: middle;
  letter-spacing: 1px;
`

const StatusTable = ({data}) => {
  const ind = Array.from(Array(data.length/2).keys())
  return(
    <Table>
      <thead>
        <tr>
          <th colSpan='4'>
            <LabelTitle>PARKING STATUS</LabelTitle>
          </th>
        </tr>
      </thead>
      <tbody>
        {
          ind.map(i => {
            return(
              <tr key={data[i].index}>
                <LeftColumn>
                  <LabelStallID>{data[i].ID}</LabelStallID>
                  <StallStatus status={data[i].status}/>
                </LeftColumn>
                <RightColumn>
                  <StallStatus status={data[i+5].status}/>
                  <LabelStallID>{data[i+5].ID}</LabelStallID>
                </RightColumn>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}

StatusTable.propTypes = {
  data: PropTypes.array.isRequired
}

export default StatusTable
