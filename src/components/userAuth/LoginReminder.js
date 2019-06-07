import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 80vh;
  padding-top: 60px;
  margin-top: 40px;
  text-align: center;
  vertical-align: center;
  font-family: 'Gill Sans', sans-serif;
  font-size: 20px;
  color: white;
  line-height: 2.0;
`

const LoginReminder = () => {
  return (
    <Wrapper>
      Please <Link to='/login'>log in</Link> first to use the iPark services.
      <br />
      New to iPark? It&apos;s free to <Link to='/signup'>sign up</Link>
    </Wrapper>
  )
}

export default LoginReminder
