import React, { Component, Fragment } from 'react'
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

const ErrMsg = styled.span`
  color: orangered;
  padding: 10px;
  margin: 10px;
`

const rgEmail = /\S+@\S+\.\S+/
const auth = firebaseApp.auth()

export default class ForgotPass extends Component {
  state = {
    email: '',
    error: false
  }

  componentDidMount() {
    this.setState({ error: false })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { email } = this.state
    if (rgEmail.test(email)) {
      auth.sendPasswordResetEmail(email)
        .then(() => {
          console.log('reset request sent')
          this.setState({ error: false })
        })
        .catch(err => console.log(err))
    }
    else {
      this.setState({ error: true })
    }
  }

  render() {
    const { error } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <AlignWrapper>
          <Title>Forgot Password?</Title>
          <br />
          <Text>To reset password, type the full email address</Text>
          <br />
          <Input name='email' placeholder='email' onChange={this.handleChange} error={error} style={{margin: '10px 20px'}} />
          <br />
          <br />
          <Button style={{margin: '0 20px 10px 20px'}} type='submit'>submit</Button>
          {error && (
            <Fragment>
              <br />
              <ErrMsg>Email format is incorrect. Please enter again</ErrMsg>
            </Fragment>
          )}
        </AlignWrapper>

      </Form>
    )
  }
}
