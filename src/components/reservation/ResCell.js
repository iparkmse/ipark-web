import React, {Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ResModal from './ResModal'
import { stalls, times } from './ResTable'
import { CredContext } from '../../contexts/CredContext'

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
  static contextType = CredContext

  state = {
    open: false,
    plates: '',
    stall: '',
    time: '',
    hours: '1',
    myUid: ''
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
    const { uid, index, hasBooked } = this.props
    const { myUid } = this.context
    
    if (hasBooked && !uid) return (
      <FreeCell data-index={index} />
    )
    else if (!uid) return (
      <FreeCell data-index={index} onClick={this.handleClick}>
        <ResModal closeHandler={this.handleClose} {...this.state } />
      </FreeCell>
    )
    return (uid === myUid ? (
      <MyCell>
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
  index: PropTypes.number
}
