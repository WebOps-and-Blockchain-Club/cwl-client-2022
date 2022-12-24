import { useState, useContext } from 'react'
import Provision from '../../interfaces/VolunteerSide/Provision'
import DropDown from '../../components/DropDown'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '../../utils/FirebaseConfig'
import Language from '../../utils/lang'
import {
  Button,
  TextField,
  Typography,
  Box,
  CssBaseline,
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
import PhoneInput from 'react-phone-number-input'
import { makeStyles } from '@material-ui/styles'
import { lightBlue } from '@mui/material/colors'

const themes = createTheme({
  palette: {
    primary: {
      main: lightBlue[700],
    },
  },
})

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: '360px',
  },
  innerDiv: {
    padding: '10px',
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
  const [validate, setValidate] = useState(false)
  const [otp, setOtp] = useState<string>('')
  const [volunteerSkills, setVolunteerSkills] = useState([])
  const [error, setError] = useState(err)
  const [isOthers, setIsOthers] = useState(false)
  const [otpOpener, setotpOpener] = useState(false)
  const { checked } = useContext(Language)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>({})
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      // eslint-disable-next-line
    } catch (error: any) {
      setError(error.message)
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setUpRecatcha = (number: any) => {
    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth)
    recaptchaVerifier.render()
    return signInWithPhoneNumber(auth, number, recaptchaVerifier)
  }
  const handleOtp = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (volunteerPhone.length === 10) {
      const response = await setUpRecatcha('+91' + volunteerPhone)
      setResult(response)
      setotpOpener(true)
    }
  }
  const verifyOtp = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (otp === '' || otp === null) return
    try {
      await result.confirm(otp)
      setValidate(true)
    } catch (err) {
      console.log(err)
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
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: matches ? 0 : 7,
          }}
        >
          <Grid container direction='row' justifyContent='center'>
            <Grid item>
              <Box
                className='{classes.text} info'
                sx={{
                  width: matches ? '340px' : '300px',
                  marginTop: '15px',
                  marginLeft: matches ? 0 : '15px',
                  marginBottom: matches ? 0 : '15px',
                  background: '#01579b',
                  // borderLeft: '15px',
                  borderRadius: matches ? '15px 15px 0px 0px' : '15px 15px 15px 15px',
                  boxShadow: 10,
                }}
              >
                <div className={classes.innerDiv}>
                  {validate ? (
                    <div>
                      {checked ? (
                        <Box
                          // sx={{ height: '400px' }}
                          display='flex'
                          flexDirection='column'
                          // justifyContent='space-between'
                        >
                          <Typography
                            align='center'
                            sx={{
                              textAlign: 'center',
                              color: '#ffffff',
                              marginTop: '20px',
                              fontSize: '17px',
                              paddingTop: matches ? 0 : '50px',
                            }}
                          >
                            What kind of volunteering are you willing to provide?
                          </Typography>
                          <Typography
                            align='center'
                            sx={{
                              fontSize: '17px',
                              textAlign: 'center',
                              color: '#fff',
                              marginTop: matches ? '30px' : '220px',
                              marginBottom: matches ? '15px' : '50px',
                            }}
                          >
                            We will contact you based on the skillset needed.
                          </Typography>
                        </Box>
                      ) : (
                        <Box
                          // sx={{ height: '400px' }}
                          display='flex'
                          flexDirection='column'
                          // justifyContent='space-between'
                        >
                          {/* Start TamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamil */}
                          <Typography
                            align='center'
                            sx={{
                              textAlign: 'center',
                              color: '#ffffff',
                              marginTop: '20px',
                              fontSize: '17px',
                              paddingTop: matches ? 0 : '50px',
                            }}
                          >
                            What kind of volunteering are you willing to provide?
                          </Typography>
                          {/* Change TamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamil */}
                          <Typography
                            align='center'
                            sx={{
                              fontSize: '17px',
                              textAlign: 'center',
                              color: '#fff',
                              marginTop: matches ? '30px' : '220px',
                              marginBottom: matches ? '15px' : '50px',
                            }}
                          >
                            We will contact you based on the skillset needed.
                          </Typography>
                          {/* End TamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamil */}
                        </Box>
                      )}
                    </div>
                  ) : (
                    <div>
                      {checked ? (
                        <Box
                          // sx={{ height: '400px' }}
                          display='flex'
                          flexDirection='column'
                          // justifyContent='space-between'
                        >
                          <Typography
                            align='center'
                            sx={{
                              textAlign: 'center',
                              color: '#ffffff',
                              marginTop: '20px',
                              fontSize: '17px',
                            }}
                          >
                            Please register if you want to <br />
                            volunteer in helping people
                            <br /> who are facing issues during emergencies
                          </Typography>
                          <Typography
                            align='center'
                            sx={{
                              fontSize: '20px',
                              textAlign: 'center',
                              color: '#fff',
                              marginTop: '120px',
                            }}
                          >
                            GCC will contact you
                            <br /> if your help is needed.
                          </Typography>
                          <Typography
                            align='center'
                            sx={{
                              fontSize: '15px',
                              textAlign: 'center',
                              color: '#29b6f6',
                              marginTop: '70px',
                            }}
                          >
                            your information will <b>not</b> be shared outside this platform
                          </Typography>
                        </Box>
                      ) : (
                        <Box
                          // sx={{ height: '400px' }}
                          display='flex'
                          flexDirection='column'
                          // justifyContent='space-between'
                        >
                          {/* Start TamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamil */}
                          <Typography
                            align='center'
                            sx={{
                              textAlign: 'center',
                              color: '#ffffff',
                              marginTop: '20px',
                              fontSize: '17px',
                            }}
                          >
                            Please register if you want to <br />
                            volunteer in helping people
                            <br /> who are facing issues during emergencies
                            {/* Change TamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamil */}
                          </Typography>
                          <Typography
                            align='center'
                            sx={{
                              fontSize: '20px',
                              textAlign: 'center',
                              color: '#fff',
                              marginTop: '120px',
                            }}
                          >
                            GCC will contact you
                            <br /> if your help is needed.
                            {/* Change TamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamil */}
                          </Typography>
                          <Typography
                            align='center'
                            sx={{
                              fontSize: '15px',
                              textAlign: 'center',
                              color: '#29b6f6',
                              marginTop: '70px',
                            }}
                          >
                            your information will <b>not</b> be shared outside this platform
                          </Typography>
                          {/* End  TamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamilTamil */}
                        </Box>
                      )}
                    </div>
                  )}
                </div>
              </Box>
            </Grid>
            <Grid item>
              <Box
                sx={{
                  backgroundColor: '#ffffff',
                  borderRadius: 4,
                  margin: 2,
                  paddingTop: 2,
                  paddingBottom: 3,

                  // border: 3,
                  // borderColor: '#85B5E3',
                }}
              >
                <Container component='main'>
                  <CssBaseline />
                  <Box
                    sx={{
                      marginTop: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {checked ? (
                      <Typography
                        variant={matches ? 'h6' : 'h5'}
                        align='center'
                        style={{ textAlign: 'center', color: '#0288d1', marginTop: '20px' }}
                      >
                        Volunteer Registration Form
                      </Typography>
                    ) : (
                      <Typography
                        variant={matches ? 'h6' : 'h5'}
                        align='center'
                        style={{ textAlign: 'center', color: '#0288d1', marginTop: '20px' }}
                      >
                        தன்னார்வ பதிவு படிவம்
                      </Typography>
                    )}
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <Assignment />
                    </Avatar>
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
                      {validate ? (
                        <Box width='310px'>
                          <DropDown
                            isOthers={null}
                            setIsOthers={null}
                            props={{
                              volunteerProvisions,
                              setVolunteerProvisions,
                              Tags: 'Help',
                              names: ['Food', 'Shelter', 'Water', 'Medical Help', 'Transport'],
                            }}
                            // sx={{ width: '310px' }}
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
                            // sx={{ width: '310px' }}
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
                              sx={{ width: '310px' }}
                            />
                          ) : null}
                          <Box
                            textAlign='center'
                            style={{ paddingTop: '30px', paddingBottom: '20px' }}
                          >
                            <Button type='submit' size='large' variant='contained'>
                              Submit
                            </Button>
                            <div style={{ color: 'red' }}>{error}</div>
                          </Box>
                        </Box>
                      ) : (
                        <div>
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
                            sx={{ width: '310px' }}
                            required
                          />

                          {!otpOpener ? (
                            <div>
                              {/* <PhoneInput
                                defaultCountry='IN'
                                value={volunteerPhone}
                                onChange={(e: string) => {
                                  if (e && e.length === 13) {
                                    setVolunteerPhone(e.replace('+91', ''))
                                  }
                                }}
                                placeholder='Enter Phone Number'
                              /> */}
                              <TextField
                                margin='normal'
                                fullWidth
                                autoFocus
                                // style={{ paddingBottom: '20px' }}
                                id='volunteer-phone'
                                label='Phone'
                                variant='outlined'
                                value={volunteerPhone}
                                onChange={(e) => {
                                  setVolunteerPhone(e.target.value)
                                  e.preventDefault()
                                }}
                                sx={{ width: '310px' }}
                                placeholder='Enter Phone Number'
                              />
                              <div className='otp-button'>
                                <Button
                                  variant='contained'
                                  onClick={handleOtp}
                                  color='primary'
                                  disabled={!(volunteerName && volunteerPhone)}
                                  sx={{ marginBottom: '2px' }}
                                >
                                  Get OTP
                                </Button>
                                <br />
                                <div id='recaptcha-container'></div>
                              </div>
                            </div>
                          ) : (
                            <div className='otp-button'>
                              <TextField
                                id='otp'
                                fullWidth
                                margin='normal'
                                label='Enter your OTP '
                                variant='outlined'
                                value={otp}
                                onChange={(e: { target: { value: string } }) => {
                                  setOtp(e.target.value)
                                }}
                                sx={{ width: '310px' }}
                              />
                              <div className='otp-button'>
                                <Button variant='contained' onClick={verifyOtp} color='primary'>
                                  Verify OTP
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
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
