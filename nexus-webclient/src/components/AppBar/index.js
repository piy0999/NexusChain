import React from 'react'
import PropTypes from 'prop-types'
import { AppBar as MuiAppBar } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { withStyles } from '@material-ui/core/styles'

/* component styles */
// import { styles } from './styles.scss'

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

const AppBar = (props) => {
  const { children } = props
  return (
    <div>
      <MuiAppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            {children}
          </Typography>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </MuiAppBar>
    </div>
  )
}

AppBar.propTypes = {
  children: PropTypes.node.isRequired
}

export default withStyles(styles)(AppBar)
