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

const DotGrey = styled(DotGreen)`
  background-color: grey;
`

const DotMaroon = styled(DotGreen)`
  background-color: maroon;
`

const DotBlack = styled(DotGreen)`
  background-color: black;
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
  else if (status === 'expiring') {
    return (
      <DotMaroon></DotMaroon>
    )
  }
  else if (status === 'violated') {
    return (
      <DotBlack></DotBlack>
    )
  }
  else if (status === '') {
    return(
      <DotGrey></DotGrey>
    )
  }
  else {
    return (
      <div>invalid status: {status}</div>
    )
  }
}

export default StallStatus