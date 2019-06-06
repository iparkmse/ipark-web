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

const SignupSuccess = () => {
  return (
    <Wrapper>
      Thanks for signing up. Please feel free to use our services.
      <br />
      <Link to='/'>Click here to check the latest parking status </Link>
    </Wrapper>
  )
}

export default SignupSuccess
