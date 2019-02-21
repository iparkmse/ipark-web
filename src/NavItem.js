import React, { Component } from 'react'
import styled from 'styled-components'
import Dialog from '@material-ui/core/Dialog'
import { withStyles } from '@material-ui/core/styles'

const Title = styled.span`
  cursor: pointer;
  font-size: 26px;
  color: #1F3864;  /* dark blue */
  font-weight: bold;
  margin: 10px;
  text-shadow: ${({isOpen}) => isOpen && '0px 0px 15px papayawhip'};

  &:hover {
    text-shadow: 0px 0px 15px papayawhip;
  }
`
// override backdrop style
const styles = {
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.1)'
  }
}

class NavItem extends Component {
  state = {
    open: false
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { itemTitle, itemContent, classes } = this.props
    return (
      <div>
        <Title
          onClick={this.handleClickOpen}
          isOpen={this.state.open}
        >
          {itemTitle}
        </Title>
        <Dialog
          onClose={this.handleClose}
          open={this.state.open}
          maxWidth='lg'
          BackdropProps={{ className: classes.backdrop }}
        >
          {itemContent}
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(NavItem)