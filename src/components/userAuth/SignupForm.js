import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Form, Input, Title } from './LoginForm'
import SignupSuccess from './SignupSuccess'
import Spinner from '../util/Spinner'
import firebaseApp from '../../firebase'

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: 560px;
  grid-template-rows: 40px 40px 40px 40px 40px;
  row-gap: 10px;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 700px) {
    grid-template-columns: 80%;
  }
`

const NameGrid = styled.div`
  display: grid;
  grid-template-columns: 260px 260px;
  grid-template-rows: 40px;
  column-gap: 40px;

  @media (max-width: 700px) {
    grid-template-columns: 47% 47%;
    column-gap: 6%;
  }
`

const ErrorGrid = styled.div`
  display: grid;
  grid-template-columns: 560px;
  line-height: 20px;
  justify-content: center;
  text-align: left;
  color: orangered;
  font-weight: 700;

  @media (max-width: 700px) {
    grid-template-columns: 80%;
  }
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

const ErrMsg = {
  fName: 'First name can\'t be empty',
  lName: 'Last name can\'t be empty',
  email: 'Email needs to be in the standard format',
  pass: 'Password must be at least 8 characters',
  confirmPass: 'Please make sure your passwords match',
  licensePlate: 'License plate must be at least 4 characters'
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
    signupErr: null,

    touched: {
      email: false,
      pass: false,
      confirmPass: false,
      fName: false,
      lName: false,
      licensePlate: false
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    auth.createUserWithEmailAndPassword(this.state.email, this.state.pass)
      .then(cred => {
        db.ref(`users/${cred.user.uid}`).set({
          uid: cred.user.uid,
          first_name: this.state.fName,
          last_name: this.state.lName,
          email: this.state.email,
          licensePlate: this.state.licensePlate
        })
      })
      .catch(err => {
        this.setState({ signupErr: err.message })
      })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    if (e.target.name === 'email' && this.state.signupErr !== null) {
      this.setState({ signupErr: null })
    }
  }

  handleBlur = e => {
    this.setState({ touched: { ...this.state.touched, [e.target.name]: true } })
  }

  render() {
    const { login } = this.props
    const { email, pass, confirmPass, fName, lName, licensePlate, signupErr } = this.state
    const errors = validate(email, pass, confirmPass, fName, lName, licensePlate)
    const isDisabled = Object.keys(errors).some(i => errors[i])

    const shouldMarkError = field => errors[field] && this.state.touched[field]

    if (login === null) return (<Spinner />)
    return (login ? (
      <SignupSuccess />
    ) : (
      <Form onSubmit={this.handleSubmit}>
        <Title>WELCOME TO IPARK</Title>
        <InputGrid>
          <NameGrid>
            <Input type='text' name='fName' placeholder='first name' onChange={this.handleChange} onBlur={this.handleBlur} error={shouldMarkError('fName')} />
            <Input type='text' name='lName' placeholder='last name' onChange={this.handleChange} onBlur={this.handleBlur} error={shouldMarkError('lName')} />
          </NameGrid>
          <Input type='email' name='email' placeholder='email' onChange={this.handleChange} onBlur={this.handleBlur} error={shouldMarkError('email')} />
          <Input type='password' name='pass' placeholder='password' onChange={this.handleChange} onBlur={this.handleBlur} error={shouldMarkError('pass')} />
          <Input type='password' name='confirmPass' placeholder='confirm password' onChange={this.handleChange} onBlur={this.handleBlur} error={shouldMarkError('confirmPass')} />
          <Input type='text' name='licensePlate' placeholder='license plate' onChange={this.handleChange} onBlur={this.handleBlur} error={shouldMarkError('licensePlate')} />
        </InputGrid>
        <Button disabled={isDisabled} type='submit'>SIGN UP</Button>
        <ErrorGrid>
          <ul>
            {signupErr}
            {Object.keys(ErrMsg).map(key => (
              shouldMarkError(key) ? (
                <li key={key}>{ErrMsg[key]}</li>
              ) : null))}
          </ul>
        </ErrorGrid>
      </Form>
    ))
  }
}

SignupForm.propTypes = {
  login: PropTypes.bool
}
