import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import ResCell from './ResCell'
import RES_DATA from './res_data'

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.6);  /* Black with Transparency of 40% */
  width: 100%;
`

const ResGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(12, 60px);
  grid-gap: 0;
  grid-auto-flow: column;
  grid-template-columns: 100px;
  grid-auto-columns: 200px;
`

const resStalls = Object.keys(RES_DATA.reservation)
const resInfo = resStalls.map(stall => Object.values(RES_DATA.reservation[stall]))


export default class ResTable extends Component {
  render() {
    console.log(resInfo)
    console.log(resInfo[0])
    return (
      <Wrapper>
        <ResGrid>
          {resInfo.map(stalls => stalls.map(stall => {
            return (
              <Fragment key={stall.index}>
                <ResCell uid={stall.uid} />
              </Fragment>
              )
          }))}
        </ResGrid>
      </Wrapper>
    )
  }
}
