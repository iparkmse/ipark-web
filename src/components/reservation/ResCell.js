import React, {Component } from 'react'
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

export default class ResCell extends Component {
  render() {
    const { uid, index } = this.props
    return (uid ? (
      <BookedCell data-index={index}>
        [booked]
      </BookedCell>
    ) : (
      <FreeCell data-index={index} />
    ))
  }
}

ResCell.propTypes = {
  uid: PropTypes.string,
  index: PropTypes.number
}
