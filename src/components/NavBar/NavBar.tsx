import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { Button } from '@mui/material'
import { makeStyles } from '@mui/material/styles'
import { lightBlue } from '@mui/material/colors'
// import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { Link } from 'wouter'
import { Theme } from '@mui/system'

// import logo from '../../images/IIT_Madras_Logo.png'

const lblue = lightBlue[900]
// const useStyles = makeStyles((theme: Theme) => ({
//   navlinks: {
//     marginLeft: theme.spacing(10),
//     display: 'flex',
//   },
//   logo: {
//     flexGrow: '1',
//     cursor: 'pointer',
//   },
//   link: {
//     textDecoration: 'none',
//     color: 'white',
//     fontSize: '20px',
//     marginLeft: theme.spacing(20),
//     '&:hover': {
//       color: 'yellow',
//       borderBottom: '1px solid white',
//     },
//   },
// }))

const NavBar = () => {
  const [auth, setAuth] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked)
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  //   const classes = useStyles()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton size='small' edge='start' color='inherit' aria-label='icon' sx={{ mr: 2 }}>
            <img src={'../../images/IIT_Madras_Logo.png'} alt='IITM' width='50px' height='auto' />
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
