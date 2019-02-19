import React, { Component } from 'react'
import styled from 'styled-components'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const Form = styled.form`
  background-color: rgba(0, 0, 0, 0.6);  // Black with Transparency of 40%
  width: 600px;
  /*height: 500px;*/
  padding: 60px 10px;
  text-align: center;
  vertical-align: center;
  font-family: 'Gill Sans', sans-serif;
`

const Title = styled.label`
  display: inline-block; 
  margin: 10px 20px 40px 20px;
  color: #D8E2F3;  // Baby Blue
  font-size: 45px;
  font-weight: bold;
`

const Label = styled.label`
  display: inline-block; 
  margin: 10px 10px 10px 10px;
  color: #FFFFFF; // White
  font-size: 22px;
  letter-spacing: 1px;
`

const Button = styled.button`
  background: #AEABAB;
  color: #FFFFFF;
  border: 2px solid #AEABAB;
  border-radius: 3px;
  margin: 0 0 10px 0;
  /*padding: 12px 16px;*/
  font-size: 25px;
  letter-spacing: 1px;
`

const ALink = styled.a`
  font-family: 'Gill Sans', sans-serif;
  color: #FFFFFF;
  text-decoration: none;
`

const Input = styled.input`
  font-size: 15px;
  color: #FFFF;
  padding: 5px 15px;
  /*background-color: none;*/
  background-color: #666666;
  border: 3px solid #FFFF;
  border-radius: 3px;
`

const LabelSmall = styled.label`
  color: #FFFFFF; // White
  font-size: 15px;
  margin: 0 0 10px 0;
`

class LoginForm extends Component {
    state = {
      email: null,
      password: null
    }
    handleSubmit = (e) => {
      e.preventDefault()
      console.log('Form Submitted \nEmail Adress:', this.state.email, '\nPassword:', this.state.password)
    }
    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      }, () => console.log(this.state.email))
    }
    handleCheckbox = () => {
      console.log('Remember User', this.state.email)
    }
    render(){
      return (
        <div>
          <Form className='LoginForm' onSubmit={this.handleSubmit}>
            <Title>WELCOME TO IPARK</Title>
            <br/>
            <Label>EMAIL ADDRESS</Label>
            <br/>
            <Input type='email' name='email' onChange={this.handleChange} />
            <br/>
            <Label>PASSWORD</Label>
            <br/>
            <Input type='password' name='password' onChange={this.handleChange} />
            <br/>
            <FormControlLabel
              control = {
                <Checkbox onClick={this.handleCheckbox}
                  color="default"
                />
              }
              label = 'Remember Me'
            />
            <br/>
            <Button type='submit'>LOGIN</Button>
            {/* <Button type='submit'><ALink href='https://github.com/iparkmse' target='_blank'>LOGIN</ALink></Button> */}
            <br/>
            <LabelSmall><ALink href='https://github.com/iparkmse'>Forget Password</ALink></LabelSmall>
            <br/>
          </Form>
        </div>
      )
    }
}

export default LoginForm