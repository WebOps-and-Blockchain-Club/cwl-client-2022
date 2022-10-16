import { useState } from 'react'
import Provision from '../../interfaces/VolunteerSide/Provision'
import DropDown from '../../components/DropDown'
import {
  Button,
  TextField,
  Typography,
  Box,
  CssBaseline,
  Paper,
  Container,
  Avatar,
  Grid,
  useTheme,
  useMediaQuery,
  createTheme,
  ThemeProvider,
} from '@mui/material'
import { Assignment } from '@mui/icons-material'
import '../../styles/VolunteerRegistrationForm.css'
import { useMutation } from '@apollo/client'
import { SignUpDocument } from '../../generated'
import Volunteer from '../../interfaces/VolunteerSide/Volunteer'
import { makeStyles } from '@material-ui/styles'
import { lightBlue } from '@mui/material/colors'

const themes = createTheme({
  palette: {
    primary: {
      main: lightBlue[700],
    },
  },
})

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  text: {
    width: '300px',
  },
}))

function VolunteerRegistrationForm({
  err,
}: {
  err: any // eslint-disable-line
}): JSX.Element {
  const [volunteerName, setVolunteerName]: [string, React.Dispatch<React.SetStateAction<string>>] =
    useState('')
  const [volunteerPhone, setVolunteerPhone]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ] = useState('')
  const [OthSkills, setOthSkills]: [string, React.Dispatch<React.SetStateAction<string>>] =
    useState('')
  const [volunteerPassword]: [string, React.Dispatch<React.SetStateAction<string>>] = useState('')
  // eslint-disable-next-line
  const [volunteerProvisions, setVolunteerProvisions]: [
    Provision[],
    React.Dispatch<React.SetStateAction<never[]>>,
  ] = useState([])
  const [otp, setOtp] = useState(false)
  const [volunteerSkills, setVolunteerSkills] = useState([])
  const [error, setError] = useState(err)
  const [isOthers, setIsOthers] = useState(false)

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

  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <div className='volunteer'>
      <ThemeProvider theme={themes}>
        <Box
          className={classes.root}
          sx={{
            borderRadius: 4,
            boxShadow: 15,
            backgroundColor: '#29b6f6',
            // maxWidth: 900,
            alignItems: 'center',
          }}
        >
          <Grid container direction='row'>
            <Grid item>
              <Box className={classes.text}>
                <h1> Heading</h1>
                <p>content</p>
                {/* ========================Enter content============================= */}
              </Box>
            </Grid>
            <Grid item>
              <Box
                sx={{
                  backgroundColor: '#ffffff',
                  borderRadius: 4,
                  margin: 2,
                  padding: 2,
                  // border: 3,
                  // borderColor: '#85B5E3',
                }}
              >
                <Container component='main' maxWidth='xs'>
                  <CssBaseline />
                  <Box
                    sx={{
                      marginTop: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <Assignment />
                    </Avatar>
                    <Typography
                      component='h3'
                      variant={matches ? 'h5' : 'h4'}
                      align='center'
                      style={{ textAlign: 'center', color: '#0288d1' }}
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
                      <Grid
                        container
                        direction='row'
                        sx={{ alignItems: 'center', justifyContent: 'space-between' }}
                      >
                        <Grid item xs={6}>
                          <div>
                            <TextField
                              id='otp'
                              fullWidth
                              margin='normal'
                              label='Enter your OTP '
                              variant='outlined'
                            />
                          </div>
                        </Grid>
                        <Grid item>
                          <div className='otp-button'>
                            <Button
                              variant='contained'
                              onClick={() => {
                                setOtp(true)
                              }}
                              color='primary'
                            >
                              Get OTP
                            </Button>
                          </div>
                        </Grid>
                      </Grid>

                      {otp ? (
                        <div>
                          <DropDown
                            isOthers={null}
                            setIsOthers={null}
                            props={{
                              volunteerProvisions,
                              setVolunteerProvisions,
                              Tags: 'Help',
                              names: ['Food', 'Shelter', 'Water', 'Medical Help', 'Transport'],
                            }}
                          />
                          <DropDown
                            isOthers={isOthers}
                            setIsOthers={setIsOthers}
                            props={{
                              volunteerProvisions: volunteerSkills,
                              setVolunteerProvisions: setVolunteerSkills,
                              Tags: 'Skills',
                              names: [
                                'Transportation',
                                'Plumbing',
                                'Swimming',
                                'Electrical',
                                'Others',
                              ],
                            }}
                          />
                          {isOthers ? (
                            <TextField
                              margin='normal'
                              fullWidth
                              autoFocus
                              variant='outlined'
                              label='Other skills'
                              value={OthSkills}
                              onChange={(e) => {
                                if (/^[a-zA-Z]*$/g.test(e.target.value)) {
                                  setOthSkills(e.target.value)
                                }
                                e.preventDefault()
                              }}
                            />
                          ) : null}
                          <Box
                            textAlign='center'
                            style={{ paddingTop: '30px', paddingBottom: '20px' }}
                          >
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
                        </div>
                      ) : null}
                    </Box>
                  </Box>
                </Container>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default VolunteerRegistrationForm
