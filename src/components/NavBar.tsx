import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Language from '../utils/lang'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { Button } from '@mui/material'
import Switch, { SwitchProps } from '@mui/material/Switch'
import Stack from '@mui/material/Stack'
import { Link, useLocation } from 'wouter'
import { styled } from '@mui/material/styles'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logo = require('../images/IIT_Madras_Logo.png')

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [, setLocation] = useLocation()
  const { checked, setChecked } = React.useContext(Language)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setLocation('/volunteer/register')
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    console.log(event.target.checked) 
  }

  return (
    <Box>
      <AppBar position='static'>
        <Toolbar>
          <IconButton size='small' edge='start' color='inherit' aria-label='icon' sx={{ mr: 2 }}>
            <img src={logo} alt='IITM' width='50px' height='auto' />
          </IconButton>
          <Link to='/'>
            {checked?(<Typography variant='h6' sx={{ flexGrow: 1 }}>
              Chennai Waterlogging Platform
            </Typography>
            ):
            (
             <Typography variant='h6' sx={{ flexGrow: 1 }}>
              செனஂனை மழைநீரஂ தேக்கபஂ பதிவுதஂ தளமஂ
            </Typography>
            )}
           
          </Link>

          
          {/* <Stack direction='row' spacing={0.5} sx={{ m: 1 }} alignItems='center'> */}
          <Stack direction='row' sx={{m:2}} alignItems='center'>
          <Typography sx={{paddingBottom:0.4,fontWeight: 'bold', fontSize: 18, m: 0.1 }}>அ</Typography>

          <Switch
            sx={{ m: -1 }}
            checked={checked}
            defaultChecked
            onChange={handleChange}
            color='default'
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Typography sx={{m: 0.5, fontWeight: 'bold', fontSize: 18 }}>En</Typography>
          {/* </Stack> */}
          </Stack>
          <Link to='/map'>
            {checked?(
            <Button variant='contained' sx={{ backgroundColor: '#00897b' }}>
              Map
            </Button>
            ):(
              <Button variant='contained' sx={{ backgroundColor: '#00897b' }}>
              வரைபடம்
            </Button>
            )
}
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
            {checked?( <MenuItem
                onClick={() => {
                  setAnchorEl(null)
                  setLocation('/complaint')
                }}
              >
                Complaint
              </MenuItem>):(
                 <MenuItem
                 onClick={() => {
                   setAnchorEl(null)
                   setLocation('/complaint')
                 }}
               >
                 புகார் செய்ய
               </MenuItem>
              )}
               {checked?( <MenuItem
                onClick={() => {
                  setAnchorEl(null)
                  setLocation('/volunteer/register')
                }}
              >
                Volunteer
              </MenuItem>):(
                 <MenuItem
                 onClick={() => {
                   setAnchorEl(null)
                   setLocation('/volunteer/register')
                 }}
               >
                 தன்னார்வலருக்கு
               </MenuItem>
              )}
              
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
