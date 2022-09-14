import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { Button } from '@mui/material'
import { Link } from 'wouter'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logo = require('../images/IIT_Madras_Logo.png')

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <AppBar position='static'>
        <Toolbar>
          <IconButton size='small' edge='start' color='inherit' aria-label='icon' sx={{ mr: 2 }}>
            <img src={logo} alt='IITM' width='50px' height='auto' />
          </IconButton>
          <Link to='/'>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Chennai Waterlogging Platform
            </Typography>
          </Link>

          <Link to='/map'>
            <Button variant='contained' sx={{ backgroundColor: '#00897b' }}>
              Map
            </Button>
          </Link>

          <div>
            <IconButton
              size='large'
              aria-label='menu'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Complaint !</MenuItem>
              <MenuItem onClick={handleClose}>Volunteer ☺ </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
