import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { LoginDocument } from '../../generated'
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Link,
  CssBaseline,
  Box,
  Container,
  Avatar,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Volunteer from '../../interfaces/VolunteerSide/Volunteer'
import { useLocation } from 'wouter'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const theme = createTheme()
const paperStyles = {
  padding: '25px 20px',
  width: 450,
  margin: '60px auto',
  display: 'flex',
  borderRadius: '10px',
}

// eslint-disable-next-line
function VolunteerLogin({ err }: { err: any }) {
  const [location, setLocation] = useLocation() // eslint-disable-line
  const [volunteerPhone, setVolunteerPhone]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ] = useState('')
  const [volunteerPassword, setVolunteerPassword]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ] = useState('')
  const [error, setError]: [string, React.Dispatch<React.SetStateAction<string>>] = useState(err)
  const { data } = useQuery(LoginDocument, {
    variables: {
      loginInput: {
        phoneNumber: volunteerPhone,
        password: volunteerPassword,
      },
    },
  })

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (): void => {
    try {
      if (data?.login.success) {
        const volunteer: Volunteer = {
          phoneNumber: volunteerPhone,
          username: data?.login.username,
          // tags: JSON.parse(data?.login.tags),
          tags: ['Food', 'Shelter'],
        }
        localStorage.setItem('USER', JSON.stringify(volunteer))
        window.location.reload()
      } else {
        throw Error('Invalid credentials')
      }
      // eslint-disable-next-line
    } catch (error: any) {
      setError(error.message)
      console.error(error)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={20} style={paperStyles}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component='h1'
              variant='h4'
              align='center'
              style={{ fontFamily: '"Times New Roman", Times, serif', textAlign: 'center' }}
            >
              Sign-In
            </Typography>
            <Box
              component='form'
              // eslint-disable-next-line
              onSubmit={(e: any) => {
                e.preventDefault()
                handleSubmit()
              }}
              noValidate
              sx={{ mt: 3 }}
            >
              <TextField
                margin='normal'
                fullWidth
                autoFocus
                id='volunteer-phone'
                label='Phone'
                variant='outlined'
                value={volunteerPhone}
                onChange={(e) => {
                  setVolunteerPhone(e.target.value)
                  e.preventDefault()
                }}
                error={volunteerPhone.length !== 0 && !/^\d{10}$/.test(volunteerPhone)}
                helperText={
                  volunteerPhone.length !== 0 && !/^\d{10}$/.test(volunteerPhone)
                    ? 'Please enter a valid phone number'
                    : ''
                }
                required
              />
              <FormControl fullWidth required variant='outlined'>
                <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
                <OutlinedInput
                  id='volunteer-password'
                  type={showPassword ? 'text' : 'password'}
                  value={volunteerPassword}
                  label='Password'
                  onChange={(e) => {
                    setVolunteerPassword(e.target.value)
                    e.preventDefault()
                  }}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        edge='end'
                      >
                        {!showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  required
                />
              </FormControl>

              <Grid container>
                <Grid
                  item
                  style={{ paddingTop: '15px', fontFamily: '"Times New Roman", Times, serif' }}
                >
                  <Link href='/volunteer/register' variant='body2'>
                    Don &apos;t have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
              <Box style={{ paddingTop: '20px', paddingBottom: '50px' }}>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  disabled={!(volunteerPassword && volunteerPhone)}
                >
                  Submit
                </Button>
                <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>
              </Box>
            </Box>
          </Box>
        </Container>
      </Paper>
    </ThemeProvider>
  )
}

export default VolunteerLogin
