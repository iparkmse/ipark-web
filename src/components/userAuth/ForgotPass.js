import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Form, Input, Title } from './LoginForm'
import firebaseApp from '../../firebase'


const AlignWrapper = styled.div`
  display: inline-block;
  text-align: left;
`

const Text = styled.span`
  color: white;
  padding: 25px;
`

const ErrMsg = styled.div`
  color: orangered;
  padding: 0 10px;
  margin: 0 10px;
`

const LinkStyle = {
  fontFamily: 'Gill Sans, sans-serif',
  color: 'lawngreen',
  textDecoration: 'underline'
}

const InputStyle = {
  margin: '10px 20px',
  width: '300px'
}

const SuccessMsg = styled.div`
  color: lawngreen;
  padding: 0 10px;
  margin: 0 10px;
`

const rgEmail = /\S+@\S+\.\S+/
const auth = firebaseApp.auth()

export default class ForgotPass extends Component {
  state = {
    email: '',
    error: false,
    success: false,
  }

  componentDidMount() {
    this.setState({ error: false, success: false })
  }

  handleChange = e => {
    if (this.state.email === '') {
      this.setState({ error: false, success: false })
    }
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { email } = this.state
    if (rgEmail.test(email)) {
      auth.sendPasswordResetEmail(email)
        .then(() => {
          this.setState({
            email: '',
            error: false,
            success: true
          })
        })
        .catch(() => {
          this.setState({
            email: '',
            error: false,
            success: true
          })
        })
    }
    else {
      this.setState({ error: true })
    }
  }

  render() {
    const { error, success, email } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <AlignWrapper>
          <Title>Forgot Password?</Title>
          <br />
          <Text>To reset password, type the full email address</Text>
          <br />
          <Input value={email} name='email' placeholder='email' onChange={this.handleChange} error={error} style={InputStyle} />
          <br />
          <br />
          <Button style={{margin: '0 5px 10px 20px'}} type='submit'>submit</Button>
          {error && (
            <Fragment>
              <br />
              <ErrMsg>Email format is incorrect. Please enter again</ErrMsg>
            </Fragment>
          )}
          {success && (
            <Fragment>
              <br />
              <SuccessMsg>
                We have emailed you password reset link!
                <br />
                <Link to='/login' style={LinkStyle}>Click here to go back to login</Link>
              </SuccessMsg>
            </Fragment>
          )}
        </AlignWrapper>
      </Form>
    )
  }
}
