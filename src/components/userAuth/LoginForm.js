import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Spinner from '../util/Spinner'
import firebaseApp from '../../firebase'

export const Form = styled.form`
  background-color: rgba(0, 0, 0, 0.6);  /* Black with Transparency of 40% */
  width: 100%;
  min-height: 80vh;
  height: 100%;
  padding: 60px 10px;
  text-align: center;
  vertical-align: center;
  font-family: 'Gill Sans', sans-serif;
`

export const Title = styled.label`
  display: inline-block; 
  margin: 10px 20px 40px 20px;
  color: #D8E2F3;  /* Baby Blue */
  font-size: 45px;
  font-weight: bold;
`

const Label = styled.label`
  display: inline-block; 
  margin: 10px 10px 10px 10px;
  color: white;
  font-size: 22px;
  letter-spacing: 1px;
`

export const Button = styled.button`
  background: steelblue;
  color: white;
  border: 2px solid steelblue;
  border-radius: 3px;
  margin: 0 0 10px 0;
  /*padding: 12px 16px;*/
  font-size: 25px;
  letter-spacing: 1px;

  &:disabled {
    background: #AEABAB;
    border: 2px solid #AEABAB;
    cursor: not-allowed;
  }
`

const LinkStyle = {
  fontFamily: 'Gill Sans, sans-serif',
  color: 'white',
  textDecoration: 'none'
}

export const Input = styled.input`
  font-size: 15px;
  color: #FFFF;
  padding: 5px 15px;
  /*background-color: none;*/
  background-color: #666666;
  border-radius: 3px;

  border: ${props => props.error ? '3px solid red' : '3px solid #FFFF'};

  ::placeholder {
    color: #D8E2F3;
    opacity: 0.6;
  }
`

const LabelSmall = styled.label`
  color: #FFFFFF; /* White */
  font-size: 15px;
  margin: 0 0 10px 0;
`

export const ErrMsg = styled.div`
  color: orangered;
  padding: 0 10px;
  margin: 0 10px;
`

const auth = firebaseApp.auth()

class LoginForm extends Component {
    state = {
      email: '',
      password: '',
      error: false,
    }

    handleSubmit = e => {
      e.preventDefault()
      const { email, password } = this.state
      auth.signInWithEmailAndPassword(email, password)
        .catch(() => {
          this.setState({ error: true, password: '' })
        })
    }

    handleChange = e => {
      this.setState({ [e.target.name]: e.target.value })
      if (this.state.email.length > 0) {
        this.setState({ error: false })
      }
    }

    handleCheckbox = () => {
      // TODO: implement this feature
    }

    render(){
      const { login } = this.props
      const { password, error } = this.state
      if (login === null) return (<Spinner />)

      return (login ? (
        <Redirect to ='/' />
      ) : (
        <Fragment>
          <Form className='LoginForm' onSubmit={this.handleSubmit}>
            <Title>WELCOME TO IPARK</Title>
            <br/>
            <Label>EMAIL ADDRESS</Label>
            <br/>
            <Input type='email' name='email' error={error} onChange={this.handleChange} />
            <br/>
            <Label>PASSWORD</Label>
            <br/>
            <Input type='password' name='password' error={error} value={password} onChange={this.handleChange} />
            <br/>
            <FormControlLabel
              control = {
                <Checkbox onClick={this.handleCheckbox}
                  color="default"
                />
              }
              label='Remember Me'
            />
            <br/>
            <Button type='submit'>LOGIN</Button>
            <br/>
            <LabelSmall><Link to='/forgot-password' style={LinkStyle}>Forgot Password?</Link></LabelSmall>
            <br/>
            {error && (
              <ErrMsg>The email or password you entered is incorrect</ErrMsg>
            )}
          </Form>
        </Fragment>
      ))
    }
}

LoginForm.propTypes = {
  login: PropTypes.bool
}

export default LoginForm