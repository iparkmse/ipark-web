import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { days, reformattedDays } from './constants'

export default class ResCalendar extends Component {
  state = {
    anchorEl: null,
    selectedIndex: 0
  }

  handleClickListItem = e => {
    this.setState({ anchorEl: e.currentTarget})
  }

  handleMenuItemClick = (e, index) => {
    this.setState({
      selectedIndex: index,
      anchorEl: null
    }, () => this.props.resMainHandler(reformattedDays[index], index))
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { anchorEl, selectedIndex } = this.state
    return (
      <Grid container justify='center'>
        <List component="nav">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary={days[selectedIndex]}
              secondary='click to choose a different date for reservation'
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {days.map((day, index) => (
            <MenuItem
              key={day}
              selected={index === selectedIndex}
              onClick={e => this.handleMenuItemClick(e, index)}
            >
              {day}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
    )
  }
}

ResCalendar.propTypes = {
  resMainHandler: PropTypes.func
}
