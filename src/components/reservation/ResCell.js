import React, {Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ResModal from './ResModal'
import { stalls, times } from './ResTable'
import { CredContextConsumer } from '../../contexts/CredContext'

const MyCell = styled.div`
  background-color: moccasin;
  border: 1px black solid;
  border-left: none;
  color: palevioletred;
  font-weight: bold;
`

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
  state = {
    open: false,
    stall: '',
    time: '',
    hours: '1',
  }

  handleClick = e => {
    const index = e.target.getAttribute('data-index')
    const stall = stalls[Math.floor(index / times.length)]
    const time = times[index % times.length]
    if (index !== null) {
      this.setState({
        open: true,
        stall: stall,
        time: time
      })
    }
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { uid, index } = this.props

    return (
      <CredContextConsumer>{context => {
        if (!uid) return (
          <FreeCell data-index={index} onClick={this.handleClick}>
            <ResModal closeHandler={this.handleClose} {...this.state } />
          </FreeCell>
        )
        return (uid === context.myUid ? (
          <MyCell>
            [my booking]
          </MyCell>
        ) : (
          <BookedCell data-index={index}>
            [booked]
          </BookedCell>
        ))
      }}
      </CredContextConsumer>
    )
  }
}

ResCell.propTypes = {
  uid: PropTypes.string,
  index: PropTypes.number
}
