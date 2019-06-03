import React, { Component } from 'react'
import styled from 'styled-components'
import { Button, Form, Input, Title } from './LoginForm'

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 400px;
  grid-template-rows: 40px 40px 40px 40px 40px;
  row-gap: 10px;
  margin-left: 90px;
  margin-bottom: 20px;
`

const NameGrid = styled.div`
  display: grid;
  grid-template-columns: 195px 195px;
  grid-template-rows: 40px;
  column-gap: 10px;
`

export default class SignupForm extends Component {
  state = {
    email: null,
    pass: null,
    confirmPass: null,
    fName: null,
    lName: null,
    licensePlate: null
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Title>WELCOME TO IPARK</Title>
        <GridWrapper>
          <NameGrid>
            <Input type='text' name='fname' placeholder='first name' />
            <Input type='text' name='lname' placeholder='last name' />
          </NameGrid>
          <Input type='email' name='email' placeholder='email' />
          <Input type='password' name='pass' placeholder='password' />
          <Input type='password' name='cpass' placeholder='confirm password' />
          <Input type='text' name='license' placeholder='license plate' />
        </GridWrapper>
        <Button type='submit'>Sign Up</Button>
      </Form>
    )
  }
}
