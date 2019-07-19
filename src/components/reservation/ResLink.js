import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const activeStyle = {
  color: 'white',
  backgroundColor: '#2196f3'
}

const ResLink = styled(NavLink)`
  display: inline-block;
  color: #2196f3;
  text-decoration: none;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  padding: 6px;
  margin: 4px;
  border-radius: 16px;

  &:hover {
    background-color: #2196f3;
    color: white;
  }
`

export const ResValLink = () => (
  <ResLink to='/validation'
    activeStyle={activeStyle}
  >
    Validation
  </ResLink>
)

export const ResTodayLink = () => (
  <ResLink to='/today'
    activeStyle={activeStyle}
  >
    View today&#39;s bookings
  </ResLink>
)
