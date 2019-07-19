import React, {Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ResModal from './ResModal'
import ForbidModal from './ForbidModal'
import ResRef from './ResRef'
import { stalls, times } from './constants'
import { CredContext } from '../../contexts/CredContext'
import { DateContextConsumer } from '../../contexts/DateContext'

const MyCell = styled.div`
  background-color: moccasin;
  border: 1px black solid;
  border-left: none;
  color: palevioletred;
  font-weight: bold;

  :hover {
    cursor: pointer;
  }
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
  static contextType = CredContext

  state = {
    open: false,
    plates: '',
    stall: '',
    time: '',
    hours: '1',
    myUid: '',
    reference: ''
  }

  handleClick = e => {
    const index = e.target.getAttribute('data-index')
    const stall = stalls[Math.floor(index / times.length)]
    const time = times[index % times.length]
    if (index !== null) {
      this.setState({
        open: true,
        stall: stall,
        time: time,
      })
    }
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleRef = reference => {
    this.setState({ reference })
  }

  componentDidUpdate(prevProps, prevState) {
    const { myUid, plates } = this.context
    if (myUid && !prevState.myUid) {
      this.setState({ myUid: myUid })
    }
    if (plates && !prevState.plates) {
      this.setState({ plates: plates })
    }
  }

  render() {
    const { uid, index, hasBooked, canClick } = this.props
    const { myUid } = this.context
    const { open, reference } = this.state

    if (hasBooked && !uid) return (
      <FreeCell data-index={index} onClick={canClick ? this.handleClick : undefined}>
        <ForbidModal closeHandler={this.handleClose} open={open} />
      </FreeCell>
    )
    else if (!uid) return (
      <FreeCell data-index={index} onClick={canClick ? this.handleClick : undefined}>
        <ResModal closeHandler={this.handleClose} {...this.state} refHandler={this.handleRef} />
      </FreeCell>
    )
    return (uid === myUid ? (
      <MyCell data-index={index} onClick={canClick ? this.handleClick : undefined}>
        <DateContextConsumer>{dateContext => (
          <ResRef closeHandler={this.handleClose} open={open} index={index} date={dateContext} reference={reference} />
        )}
        </DateContextConsumer>
        [my booking]
      </MyCell>
    ) : (
      <BookedCell data-index={index}>
        [booked]
      </BookedCell>
    ))
  }
}

ResCell.propTypes = {
  uid: PropTypes.string,
  index: PropTypes.number,
  hasBooked: PropTypes.bool,
  canClick: PropTypes.bool
}
