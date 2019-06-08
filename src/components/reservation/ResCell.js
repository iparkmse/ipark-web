import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const BookedCell = styled.div`
  background-color: #D8E2F3;
`

const FreeCell = styled.div`
  background-color: white
`


const ResCell = ({ uid }) => {
  return (uid ? (
    <BookedCell />
  ) : (
    <FreeCell />
  ))
}

ResCell.propTypes = {
  uid: PropTypes.string
}

export default ResCell
