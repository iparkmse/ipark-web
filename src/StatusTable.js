import React from 'react'
import PropTypes from 'prop-types'

const StatusTable = ({data}) => {
  const ind = Array.from(Array(data.length/2).keys())
  return(
    <table>
      <thead>
        <tr>
          <th colSpan='4'>PARKING STATUS</th>
        </tr>
      </thead>
      <tbody>
        {
          ind.map(i => {
            return(
              <tr key={data[i].id}>
                <td>{data[i].ID}  {data[i].status}</td>
                <td>{data[i+5].ID}  {data[i+5].status}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

StatusTable.propTypes = {
  data: PropTypes.array
}

export default StatusTable
