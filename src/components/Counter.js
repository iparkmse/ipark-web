import React, { Fragment } from 'react'

const Counter = ({ initialValue, HandleClick }) => (
  <Fragment>
    <span>{initialValue}</span>
    <br />
    <button onClick={HandleClick}>+1</button>
  </Fragment>
)

export default Counter
