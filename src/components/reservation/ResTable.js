import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { isEqual } from 'underscore'
import { times } from './constants'
import ResCell from './ResCell'
import Spinner from '../util/Spinner'
import { CredContext } from '../../contexts/CredContext'

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.6);  /* Black with Transparency of 40% */
  width: 100%;
  margin-top: 20px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`

const ResGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(12, 50px);
  grid-gap: 0;
  grid-auto-flow: column;
  grid-template-columns: 50px;
  grid-auto-columns: 200px;
  justify-content: center;

  @media (max-width: 700px) {
    grid-auto-columns: 25%;
  }
`

const Label = styled.span`
  color: NavajoWhite;
  border: 1px solid whitesmoke;
`

const HeaderGrid = styled.div`
  display: grid;
  grid-template-columns: 50px 200px 200px 200px;
  grid-template-rows: 20px;
  justify-content: center;
  text-align: center;

  @media (max-width: 700px) {
    grid-template-columns: 50px 25% 25% 25%;
  }
`

const Header = ({ date }) => {
  return (
    <HeaderGrid>
      <Label>{date}</Label>
      <Label>A1</Label>
      <Label>A2</Label>
      <Label>A3</Label>
    </HeaderGrid>
  )
}

const TimeCol = () => times.map(time => {
  return (
    <Fragment key={time}>
      <Label>{time}</Label>
    </Fragment>
  )
})

export default class ResTable extends Component {
  static contextType = CredContext
  state = {
    hasBooked: null
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props
    const { resData } = newProps
    const { myUid } = this.context
    if (!isEqual(this.props.resData, oldProps.resData)) {
      const resStalls = Object.keys(resData)
      const resInfo = resStalls.map(stall => Object.values(resData[stall]))
      let found = false
      for (let i = 0; i < resInfo.length && !found; i++) {
        for (let j = 0; j < resInfo[i].length && !found; j++) {
          if (resInfo[i][j].uid === myUid) found = true
        }
      }
      if (found) this.setState({ hasBooked: true })
      else this.setState({ hasBooked: false })
    }
  }

  render() {
    const { canClick, date, resData } = this.props
    const { hasBooked } = this.state
    if (resData) {
      const resStalls = Object.keys(resData)
      const resInfo = resStalls.map(stall => Object.values(resData[stall]))
      return (
        <Wrapper>
          <Header date={date}/>
          <ResGrid>
            <TimeCol />
            {resInfo.map(stalls => stalls.map(stall => {
              return (
                <Fragment key={stall.index}>
                  <ResCell uid={stall.uid} index={stall.index} hasBooked={hasBooked} canClick={canClick} />
                </Fragment>
              )
            }))}
          </ResGrid>
        </Wrapper>
      )
    }
    return <Spinner />
  }
}

Header.propTypes = {
  date: PropTypes.string
}

ResTable.propTypes = {
  date: PropTypes.string,
  resData: PropTypes.object,
  canClick: PropTypes.bool
}
