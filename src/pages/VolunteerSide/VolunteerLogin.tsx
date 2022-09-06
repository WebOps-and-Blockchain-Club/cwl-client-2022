import React, { useState } from 'react'
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Link,
  Avatar,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Box,
  Container,
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import Volunteer from '../../interfaces/VolunteerSide/Volunteer'
import { useLocation } from 'wouter'

const theme = createTheme()
const useStyles: any = makeStyles({
  main: {
    // background: '#90EE90',
    // border: 0,
    // borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // color: 'white',
    // height:  ,
    textAlign: 'center',
    margin: 'auto',
    padding: '0 100px',
    // alignItems: 'center',
  },
  content: {},
})
const paperStyles = {
  padding: '25px 20px',
  width: 450,
  margin: '60px auto',
  display: 'flex',
  borderRadius: '10px',
}

// eslint-disable-next-line
function VolunteerLogin({ volunteerList, err }: { volunteerList: Volunteer[] | null; err: any }) {
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
  const classes = useStyles()
  const handleSubmit = (): void => {
    if (!volunteerList) {
      return
    }
    try {
      console.log(volunteerList)
      const res = volunteerList.some((volunteer: Volunteer): boolean => {
        console.log(volunteer)
        if (volunteer.phoneNumber === volunteerPhone) {
          if (volunteer.password === volunteerPassword) {
            localStorage.setItem('USER', JSON.stringify(volunteer))
            console.log('Login successful')
            window.location.reload()
            console.log('Post redirect')
            return true
          }
          throw Error('Wrong password')
        }
        return false
      })
      if (!res) {
        throw Error('This user does not exist')
      }
      // eslint-disable-next-line
    } catch (error: any) {
      setError(error.message)
      console.error(error)
    }
  }

  return (
    // <div>
    //   <form
    //     action='post'
    //     onSubmit={(e) => {
    //       handleSubmit()
    //       e.preventDefault()
    //     }}
    //   >
    //     <Typography
    //       variant='h4'
    //       style={{ color: 'grey', textAlign: 'center', paddingBottom: '40px', padding: '20px' }}
    //     >
    //       Volunteer Sign-In
    //     </Typography>
    //     <Paper elevation={4}
    //     sx={{
    //       alignItems:'center'
    //     }}>
    //       <div style={{ textAlign: 'center' }}>
    //         <div style={{ paddingTop: '20px' }}>
    // <TextField
    //   style={{ paddingBottom: '20px' }}
    //   id='volunteer-phone'
    //   label='Phone'
    //   variant='outlined'
    //   color='success'
    //   value={volunteerPhone}
    //   onChange={(e) => {
    //     setVolunteerPhone(e.target.value)
    //     e.preventDefault()
    //   }}
    //   error={volunteerPhone.length !== 0 && !/^\d{10}$/.test(volunteerPhone)}
    //   helperText={
    //     volunteerPhone.length !== 0 && !/^\d{10}$/.test(volunteerPhone)
    //       ? 'Please enter a valid phone number'
    //       : ''
    //   }
    //   required
    // />
    //         </div>
    //         <div>
    // <TextField
    //   style={{ paddingBottom: '20px' }}
    //   id='volunteer-password'
    //   type='password'
    //   label='Password'
    //   variant='outlined'
    //   color='success'
    //   value={volunteerPassword}
    //   onChange={(e) => {
    //     setVolunteerPassword(e.target.value)
    //     e.preventDefault()
    //   }}
    //   autoComplete='current-password'
    //   required
    // />
    //         </div>
    //         <Grid container>
    //           <Grid item>
    //             <Link href="#" variant="body2">
    //               {"Don't have an account? Sign Up"}
    //             </Link>
    //           </Grid>
    //         </Grid>
    //         <div style={{ paddingBottom: '20px' }}>
    //           <Button
    //             type='submit'
    //             variant='contained'
    //             color='success'
    //             disabled={!(volunteerPassword && volunteerPhone)}
    //           >
    // //             Submit
    // //           </Button>
    //         </div>
    //       </div>
    //     </Paper>
    //   </form>
    // <div style={{ color: 'red' }}>{error}</div>
    // </div>
    <div style={{ background: 'linear-gradient(white,#0073e6,white)' }}>
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
              <Typography
                component='h1'
                variant='h4'
                align='center'
                style={{ fontFamily: '"Times New Roman", Times, serif', textAlign: 'center' }}
              >
                Volunteer Sign-In
              </Typography>
              <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
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

                <TextField
                  margin='normal'
                  fullWidth
                  id='volunteer-password'
                  type='password'
                  label='Password'
                  variant='outlined'
                  value={volunteerPassword}
                  onChange={(e) => {
                    setVolunteerPassword(e.target.value)
                    e.preventDefault()
                  }}
                  autoComplete='current-password'
                  required
                />

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

                {/* <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button> */}
                <Box style={{ paddingTop: '20px', paddingBottom: '50px' }}>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    disabled={!(volunteerPassword && volunteerPhone)}
                    // sx={{ mt: 3, mb: 2 }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </Paper>
        <div style={{ color: 'red' }}>{error}</div>
      </ThemeProvider>
    </div>
  )
}

export default VolunteerLogin
