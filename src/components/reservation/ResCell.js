import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const BookedCell = styled.div`
  background-color: papayawhip;
  border: 1px black solid;
  border-left: none;
  color: silver;
  font-style: italic;

  :hover {
    cursor: not-allowed;
  }
`

const FreeCell = styled.div`
  background-color: white;
  border: 1px black solid;
  border-left: none;

  :hover {
    background-color: paleturquoise;
  }
`


const ResCell = ({ uid }) => {
  return (uid ? (
    <BookedCell>
      [booked]
    </BookedCell>
  ) : (
    <FreeCell />
  ))
}

ResCell.propTypes = {
  uid: PropTypes.string
}

export default ResCell
