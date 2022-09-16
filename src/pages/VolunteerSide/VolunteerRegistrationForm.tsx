import { useState } from 'react'
import Provision from '../../interfaces/VolunteerSide/Provision'
import DropDown from '../../components/DropDown'
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
  OutlinedInput,
  Avatar,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
} from '@mui/material'
import { Assignment, Visibility, VisibilityOff } from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import '../../styles/VolunteerRegistrationForm.css'
import { useMutation } from '@apollo/client'
import { SignUpDocument } from '../../generated'
import Volunteer from '../../interfaces/VolunteerSide/Volunteer'
const theme = createTheme()
const paperStyles = {
  padding: '30px 60px',
  width: 575,
  margin: '60px auto',
  display: 'flex',
  borderRadius: '10px',
}

function VolunteerRegistrationForm({
  err,
}: {
  err: any // eslint-disable-line
}) {
  const [volunteerName, setVolunteerName]: [string, React.Dispatch<React.SetStateAction<string>>] =
    useState('')
  const [volunteerPhone, setVolunteerPhone]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ] = useState('')
  const [volunteerPassword, setVolunteerPassword]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ] = useState('')
  // eslint-disable-next-line
  const [volunteerProvisions, setVolunteerProvisions]: [
    Provision[],
    React.Dispatch<React.SetStateAction<never[]>>,
  ] = useState([])
  const [error, setError] = useState(err)
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  // eslint-disable-next-line
  const [signUp, { data }] = useMutation(SignUpDocument, {
    variables: {
      volunteerInput: {
        username: volunteerName,
        phoneNumber: volunteerPhone,
        tags: JSON.stringify(volunteerProvisions),
        password: volunteerPassword,
      },
    },
  })

  const handleSubmit = async (): Promise<void> => {
    if (volunteerProvisions.length === 0) {
      setError('Please tell us how you can help')
      return
    }
    try {
      const { data } = await signUp({
        variables: {
          volunteerInput: {
            username: volunteerName,
            phoneNumber: volunteerPhone,
            password: volunteerPassword,
            tags: JSON.stringify(volunteerProvisions),
          },
        },
      })
      console.log(data)
      const volunteer: Volunteer = {
        phoneNumber: volunteerPhone,
        username: data?.signUp.username || '',
        tags: JSON.parse(data?.signUp.tags || ''),
      }
      localStorage.setItem('USER', JSON.stringify(volunteer))
      window.location.reload()
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
              <Assignment />
            </Avatar>
            <Typography
              component='h1'
              variant='h4'
              align='center'
              style={{ fontFamily: '"Times New Roman", Times, serif', textAlign: 'center' }}
            >
              Volunteer Registration Form
            </Typography>
            <Typography
              // variant='h6'
              color='#bdbdbd'
              fontSize='8'
              style={{ textAlign: 'center', padding: '5px', paddingBottom: '10px' }}
            >
              Fill the form to be a part of the mission
            </Typography>
            <Grid container>
              <Grid
                item
                style={{
                  alignItems: 'left',
                  paddingTop: '15px',
                  fontFamily: '"Times New Roman", Times, serif',
                }}
              >
                <Link href='/volunteer/login' variant='body1'>
                  Already Registered? Sign-In
                </Link>
              </Grid>
            </Grid>
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
                // style={{ paddingBottom: '20px' }}
                id='volunteer-name'
                label='Name'
                variant='outlined'
                value={volunteerName}
                onChange={(e) => {
                  setVolunteerName(e.target.value)
                  e.preventDefault()
                }}
                error={
                  volunteerName.length !== 0 &&
                  !/^[A-Z]?[a-z]*(\s[A-Z])?[a-z]*$/.test(volunteerName)
                }
                helperText={
                  volunteerName.length !== 0 &&
                  !/^[A-Z]?[a-z]*(\s[A-Z])?[a-z]*$/.test(volunteerName)
                    ? 'Please enter a valid name'
                    : ''
                }
                required
              />
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
              <Box style={{ paddingTop: '15px' }}>
                <FormControl fullWidth required variant='outlined'>
                  <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
                  <OutlinedInput
                    id='volunteer-password'
                    fullWidth
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
              </Box>
              <DropDown props={{ volunteerProvisions, setVolunteerProvisions }} />
              <Box textAlign='center' style={{ paddingTop: '30px', paddingBottom: '50px' }}>
                <Button
                  type='submit'
                  size='large'
                  variant='contained'
                  disabled={!(volunteerName && volunteerPhone && volunteerPassword)}
                >
                  Submit
                </Button>
                <div style={{ color: 'red' }}>{error}</div>
              </Box>
            </Box>
          </Box>
        </Container>
      </Paper>
    </ThemeProvider>
  )
}

export default VolunteerRegistrationForm
