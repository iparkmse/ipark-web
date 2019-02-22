import React from 'react'
import styled from 'styled-components'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import NavLogin from './NavLogin'

const ImgWrapper = styled.span`
  padding: 5px 5px 2px 5px;
  flex-grow: 1;
`

const Navbar = () => {
  return (
    <div>
      <AppBar position="fixed" style={{ background: '#CEE2F3'}}>
        <Toolbar>
          <ImgWrapper>
            <img src={require('./img/ipark_logo.png')} alt='missing image' />
          </ImgWrapper>
          <NavLogin />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
