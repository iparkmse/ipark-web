import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const BookedCell = styled.div`
  background-color: papayawhip;
  border: 1px black solid;
`

const FreeCell = styled.div`
  background-color: white;
  border: 1px black solid;
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
