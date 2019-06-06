import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Form, Input, Title } from './LoginForm'
import SignupSuccess from './SignupSuccess'
import Spinner from '../util/Spinner'
import firebaseApp from '../../firebase'

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 400px;
  grid-template-rows: 40px 40px 40px 40px 40px;
  row-gap: 10px;
  justify-content: center;
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
    confirmPass: confirmPass !== pass || confirmPass.length === 0,
    fName: !rgName.test(fName),
    lName: !rgName.test(lName),
    licensePlate: licensePlate.length < 4
  }
}

const auth = firebaseApp.auth()
const db = firebaseApp.database()

export default class SignupForm extends Component {
  state = {
    email: '',
    pass: '',
    confirmPass: '',
    fName: '',
    lName: '',
    licensePlate: '',

    touched: {
      email: false,
      pass: false,
      confirmPass: false,
      fName: false,
      lName: false,
      licensePlate: false
    }
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
    console.log('sign up successfully')
    auth.createUserWithEmailAndPassword(this.state.email, this.state.pass).then(cred => {
      db.ref(`users/${this.state.fName}_${this.state.lName}_${cred.user.uid}`).set({
        uid: cred.user.uid,
        first_name: this.state.fName,
        last_name: this.state.lName,
        email: this.state.email,
        licensePlate: this.state.licensePlate
      })
    })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleBlur = e => {
    this.setState({ touched: { ...this.state.touched, [e.target.name]: true } })
  }

  render() {
    const { login } = this.props
    const { email, pass, confirmPass, fName, lName, licensePlate } = this.state
    const errors = validate(email, pass, confirmPass, fName, lName, licensePlate)
    const isDisabled = Object.keys(errors).some(i => errors[i])

    const shouldMarkError = field => errors[field] && this.state.touched[field]

    if (login === null) return (<Spinner />)
    return (login ? (
      <SignupSuccess />
    ) : (
      <Form onSubmit={this.handleSubmit}>
        <Title>WELCOME TO IPARK</Title>
        <GridWrapper>
          <NameGrid>
            <Input type='text' name='fName' placeholder='first name' onChange={this.handleChange} onBlur={this.handleBlur} error={shouldMarkError('fName')} required />
            <Input type='text' name='lName' placeholder='last name' onChange={this.handleChange} onBlur={this.handleBlur} error={shouldMarkError('lName')} required />
          </NameGrid>
          <Input type='email' name='email' placeholder='email' onChange={this.handleChange} onBlur={this.handleBlur} error={shouldMarkError('email')} required />
          <Input type='password' name='pass' placeholder='password' onChange={this.handleChange} onBlur={this.handleBlur} error={shouldMarkError('pass')} required />
          <Input type='password' name='confirmPass' placeholder='confirm password' onChange={this.handleChange} onBlur={this.handleBlur} error={shouldMarkError('confirmPass')} required />
          <Input type='text' name='licensePlate' placeholder='license plate' onChange={this.handleChange} onBlur={this.handleBlur} error={shouldMarkError('licensePlate')} required />
        </GridWrapper>
        <Button disabled={isDisabled} type='submit'>SIGN UP</Button>
      </Form>
    ))
  }
}

SignupForm.propTypes = {
  login: PropTypes.bool
}
