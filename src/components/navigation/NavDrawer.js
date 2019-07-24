import React,  { Component }  from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import AlarmIcon from '@material-ui/icons/Alarm'
import CommuteIcon from '@material-ui/icons/Commute'
import PersonIcon from '@material-ui/icons/Person'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import { logout } from './NavContent'


const SideList = ({ toggleDrawer, login }) => (
  <div
    role="presentation"
    onClick={toggleDrawer(false)}
    onKeyDown={toggleDrawer(false)}
  >
    {login ? (
      <List>
        <ListItem button component={NavLink} exact to='/'>
          <ListItemIcon><CommuteIcon /></ListItemIcon>
          <ListItemText>Parking Status</ListItemText>
        </ListItem>
        <ListItem button component={NavLink} exact to='/reservation'>
          <ListItemIcon><AlarmIcon /></ListItemIcon>
          <ListItemText>Reservation</ListItemText>
        </ListItem>
        <ListItem button onClick={logout}>
          <ListItemIcon><NotInterestedIcon /></ListItemIcon>
          <ListItemText>Log Out</ListItemText>
        </ListItem>
      </List>
    ) : (
      <List>
        <ListItem button component={NavLink} exact to='/'>
          <ListItemIcon><CommuteIcon /></ListItemIcon>
          <ListItemText>Parking Status</ListItemText>
        </ListItem>
        <ListItem button component={NavLink} exact to='/login'>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText>Login</ListItemText>
        </ListItem>
        <ListItem button component={NavLink} exact to='/signup'>
          <ListItemIcon><PersonAddIcon /></ListItemIcon>
          <ListItemText>Sign Up</ListItemText>
        </ListItem>
      </List>
    )}
  </div>
)

export default class NavDrawer extends Component {
  state = {
    open: false
  }

  toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    this.setState({ open })
  }

  render() {
    const { login } = this.props
    const { open } = this.state
    return (
      <div>
        <Button onClick={this.toggleDrawer(true)}>
          <MenuIcon />
        </Button>
        <Drawer anchor="right" open={open} onClose={this.toggleDrawer(false)}>
          <SideList toggleDrawer={this.toggleDrawer} login={login}/>
        </Drawer>
      </div>
    )
  }
}

NavDrawer.propTypes = {
  login: PropTypes.bool,
}

SideList.propTypes = {
  login: PropTypes.bool,
  toggleDrawer: PropTypes.func,
}
