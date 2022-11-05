import { useContext, ChangeEvent, useState } from 'react'
import { AppBar, Box, Toolbar, Typography, IconButton, Grid, Switch, Stack } from '@mui/material'
import Language from '../../utils/lang'
import { Link } from 'wouter'
import { WhatsApp } from '@mui/icons-material'

const NavBar = (props: {
  props: {
    showWhatsAppInstructionsModal: boolean
    setShowWhatsAppInstructionsModal: React.Dispatch<React.SetStateAction<boolean>>
  }
}) => {
  const { checked, setChecked } = useContext(Language)
  const { showWhatsAppInstructionsModal, setShowWhatsAppInstructionsModal } = props.props
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
  return (
    <Box>
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
                      src={require('../../images/cwl_eng.png')}
                      alt='CWL'
                      width='100px'
                      height='50px'
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
                      src={require('../../images/cwl_tamil.png')}
                      alt='CWL'
                      width='100px'
                      height='50px'
                    />
                  </IconButton>
                )}
              </Link>
            </Grid>
            <Grid item>
              <Grid container direction='row' sx={{ alignItems: 'center' }}>
                <Grid item>
                  <Stack direction='row' sx={{ marginRight: 1 }} alignItems='center'>
                    <WhatsApp // eslint-disable-next-line
                      onClick={(e: any) => {
                        e.preventDefault()
                        setShowWhatsAppInstructionsModal(!showWhatsAppInstructionsModal)
                      }}
                      style={{
                        color: '#00ff00',
                        fontSize: '30px',
                      }}
                    />
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
                  <Box sx={{ backgroundColor: '#00897b', marginTop: '5px', marginBottom: '5px' }}>
                    <Link to='/map' onClick={() => window.location.reload()}>
                      <IconButton size='large' color='inherit' aria-label='icon'>
                        <img
                          src={require('../../images/mapIcon.png')}
                          alt='CWL'
                          width='45px'
                          height='30px'
                        />
                      </IconButton>
                    </Link>
                  </Box>
                </Grid>
                {/* <Grid item>
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
                </Grid> */}
                {/* This is not required as of now (Report and Compliant) */}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
