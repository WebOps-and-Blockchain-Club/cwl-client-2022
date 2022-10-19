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
import { createTheme, Grid, ThemeProvider } from '@mui/material'
import Switch from '@mui/material/Switch'
import Stack from '@mui/material/Stack'
import { Link, useLocation } from 'wouter'
import { lightBlue } from '@mui/material/colors'

const themes = createTheme({
  palette: {
    primary: {
      main: lightBlue[900],
    },
  },
})

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
      <ThemeProvider theme={themes}>
        <AppBar position='static'>
          <Toolbar>
            <Grid
              container
              direction='row'
              sx={{ alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Grid item>
                <Link to='/'>
                  {checked ? (
                    <IconButton
                      size='large'
                      edge='start'
                      color='inherit'
                      aria-label='icon'
                      sx={{ mr: 1 }}
                    >
                      <img
                        src={require('../images/cwl_eng.png')}
                        alt='CWL'
                        width='100px'
                        height='40px'
                      />
                    </IconButton>
                  ) : (
                    <IconButton
                      size='large'
                      edge='start'
                      color='inherit'
                      aria-label='icon'
                      sx={{ mr: 1 }}
                    >
                      <img
                        src={require('../images/cwl_tamil.png')}
                        alt='CWL'
                        width='100px'
                        height='40px'
                      />
                    </IconButton>
                  )}
                </Link>
              </Grid>
              <Grid item>
                <Grid container direction='row' sx={{ alignItems: 'center' }}>
                  <Grid item>
                    <Stack direction='row' sx={{ marginRight: 1 }} alignItems='center'>
                      <Typography sx={{ fontWeight: 'bold', fontSize: 10, m: 0.1 }}>அ</Typography>

                      <Switch
                        sx={{ m: -1 }}
                        checked={checked}
                        defaultChecked
                        onChange={handleChange}
                        color='default'
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                      <Typography sx={{ m: 0.5, fontWeight: 'bold', fontSize: 10 }}>En</Typography>
                    </Stack>
                  </Grid>
                  <Grid item>
                    <Box sx={{ backgroundColor: '#46BEEB' }}>
                      <Link to='/map'>
                        <IconButton size='small' color='inherit' aria-label='icon'>
                          <img
                            src={require('../images/map.png')}
                            alt='CWL'
                            width='40px'
                            height='40px'
                          />
                        </IconButton>
                      </Link>
                    </Box>
                  </Grid>
                  <Grid item>
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
                        {checked ? (
                          <MenuItem
                            onClick={() => {
                              setAnchorEl(null)
                              setLocation('/complaint')
                            }}
                          >
                            Report
                          </MenuItem>
                        ) : (
                          <MenuItem
                            onClick={() => {
                              setAnchorEl(null)
                              setLocation('/complaint')
                            }}
                          >
                            அறிக்கை
                          </MenuItem>
                        )}
                        {checked ? (
                          <MenuItem
                            onClick={() => {
                              setAnchorEl(null)
                              setLocation('/volunteer/register')
                            }}
                          >
                            Volunteer
                          </MenuItem>
                        ) : (
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
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  )
}

export default NavBar
