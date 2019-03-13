import React from 'react'
import styled from 'styled-components'

const DotGreen = styled.label`
  height: 50px;
  width: 50px;
  background-color: ForestGreen;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
`

const DotRed = styled(DotGreen)`
  background-color: red;
`

const DotYellow = styled(DotGreen)`
  background-color: gold;
`

const DotBlack = styled(DotGreen)`
  background-color: grey;
`

const StallStatus = ({status}) => {
  if (status === 'vacant') {
    return (
      <DotGreen></DotGreen>
    )
  }
  else if (status === 'occupied') {
    return (
      <DotRed></DotRed>
    )
  }
  else if (status === 'reserved') {
    return (
      <DotYellow></DotYellow>
    )
  }
  else if (status === '') {
    return(
      <DotBlack></DotBlack>
    )
  }
  else {
    return (
      <div>invalid status: {status}</div>
    )
  }
}

export default StallStatus