import React, { Component } from 'react'
import styled from 'styled-components'
import { Button, Form, Input, Title } from './LoginForm'
import firebaseApp from '../../firebase'

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

const validate = (email, pass, confirmPass, fName, lName, licensePlate) => {
  const rgEmail = /\S+@\S+\.\S+/
  const rgName = /^[a-z ,.'-]+$/i
  return {
    email: !rgEmail.test(email),
    pass: pass.length < 8,
    confirmPass: confirmPass !== pass,
    fName: !rgName.test(fName),
    lName: !rgName.test(lName),
    licensePlate: licensePlate.length < 4
  }
}

export default class SignupForm extends Component {
  state = {
    email: '',
    pass: '',
    confirmPass: '',
    fName: '',
    lName: '',
    licensePlate: ''
  }

  canBeSubmitted = () => {
    const errors = validate(this.state.email, this.state.pass, this.state.confirmPass, this.state.fName, this.state.lName, this.state.licensePlate)
    const isDisabled = Object.keys(errors).some(i => errors[i])
    return !isDisabled
  }

  handleSubmit = (e) => {
    if (!this.canBeSubmitted()) {
      e.preventDefault()
      console.log('some fields are invalid')
      return
    }
    e.preventDefault()
    console.log(this.state.email)
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    const errors = validate(this.state.email, this.state.pass, this.state.confirmPass, this.state.fName, this.state.lName, this.state.licensePlate)
    const isDisabled = Object.keys(errors).some(i => errors[i])

    return (
      <Form onSubmit={this.handleSubmit}>
        <Title>WELCOME TO IPARK</Title>
        <GridWrapper>
          <NameGrid>
            <Input type='text' name='fName' placeholder='first name' onChange={this.handleChange} required />
            <Input type='text' name='lName' placeholder='last name' onChange={this.handleChange} required />
          </NameGrid>
          <Input type='email' name='email' placeholder='email' onChange={this.handleChange} required />
          <Input type='password' name='pass' placeholder='password' onChange={this.handleChange} required />
          <Input type='password' name='confirmPass' placeholder='confirm password' onChange={this.handleChange} required />
          <Input type='text' name='licensePlate' placeholder='license plate' onChange={this.handleChange} required />
        </GridWrapper>
        <Button type='submit'>Sign Up</Button>
      </Form>
    )
  }
}