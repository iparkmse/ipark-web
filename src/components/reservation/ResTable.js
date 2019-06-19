import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ResCell from './ResCell'
import Spinner from '../util/Spinner'

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

export const stalls = ['A1', 'A2', 'A3']
export const times = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

const TimeCol = () => times.map(time => {
  return (
    <Fragment key={time}>
      <Label>{time}</Label>
    </Fragment>
  )
})

export default class ResTable extends Component {
  render() {
    const { date, resData } = this.props
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
                  <ResCell uid={stall.uid} index={stall.index} />
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
  resData: PropTypes.object
}
