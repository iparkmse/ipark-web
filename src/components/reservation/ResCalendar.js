import React, { Component } from 'react'
import { format, addDays } from 'date-fns'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

const dayOne = format(addDays(new Date(), 1), 'MMM Do, dddd')
const dayTwo = format(addDays(new Date(), 2), 'MMM Do, dddd')
const dayThree = format(addDays(new Date(), 3), 'MMM Do, dddd')

const options = [
  dayOne,
  dayTwo,
  dayThree,
]

export default class ResCalendar extends Component {
  state = {
    date: '',
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
    })
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
              primary={options[selectedIndex]}
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
          {options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === selectedIndex}
              onClick={e => this.handleMenuItemClick(e, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
    )
  }
}
