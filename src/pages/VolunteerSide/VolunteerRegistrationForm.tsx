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
      // const volunteer: Volunteer = {
      //   phoneNumber: volunteerPhone,
      //   username: data?.signUp.username || '',
      //   tags: JSON.parse(data?.signUp.tags || ''),
      // }

      // eslint-disable-next-line
    } catch (error: any) {
      setError(error.message)
      console.error(error)
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
      setotpOpener(false)
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
          }}
        >
          <Grid container direction='row'>
            <Grid item>
              <Box className={classes.text}>
                <div className={classes.innerDiv}>
                  {checked ? (
                    <Typography
                      component='h6'
                      variant={matches ? 'h6' : 'h6'}
                      align='center'
                      style={{ textAlign: 'center', color: '#fff', marginTop: '20px' }}
                    >
                      Volunteer Registration Form
                    </Typography>
                  ) : (
                    <Typography
                      component='h6'
                      variant={matches ? 'h6' : 'h6'}
                      align='center'
                      style={{ textAlign: 'center', color: '#fff', marginTop: '20px' }}
                    >
                      தன்னார்வ பதிவு படிவம்
                    </Typography>
                  )}

                  {checked ? (
                    <Typography
                      align='center'
                      sx={{
                        textAlign: 'center',
                        color: '#fff',
                        marginTop: '20px',
                      }}
                    >
                      This registration form serves the purpose of getting information from the
                      volunteers who are open to helping needy people in and around their locality
                      with essential things that they are willing to give like Food, Shelter,
                      General etc. Further, We would like you to tell us your occupational skills
                      (if any) that may assist in helping the people who are facing issues during
                      these tough times. As you will be identifying yourself as a volunteer by
                      registering here, We might contact you if your help is needed. We confirm that
                      your information will not be shared outside this platform.
                    </Typography>
                  ) : (
                    <Typography
                      align='center'
                      sx={{
                        textAlign: 'center',
                        color: '#fff',
                        marginTop: '20px',
                      }}
                    >
                      இந்தப் பதிவுப் படிவம், உணவு, தங்குமிடம் போன்றவற்றை மற்றும் அத்தியாவசியப்
                      பொருட்களைத் தங்கள் பகுதியில் சுற்றியுள்ள மக்களுக்கும் வழங்கி உதவத் தயாராக
                      இருக்கும் தன்னார்வத் தொண்டர்களிடமிருந்து தங்களது தகவல்களைப் பெறுவதற்கு
                      உதவுகிறது. மேலும், இந்த கடினமான காலங்களில் பிரச்சனைகளை எதிர்கொள்ளும்
                      மக்களுக்கு உதவக்கூடிய உங்கள் தொழில் திறன்களை (ஏதேனும் இருந்தால்) எங்களிடம் கூற
                      விரும்புகிறோம். இங்கே பதிவு செய்வதன் மூலம் நீங்கள் உங்களை ஒரு தன்னார்வத்
                      தொண்டராக அடையாளம் காண்பீர்கள், உங்கள் உதவி தேவைப்பட்டால் நாங்கள் உங்களைத்
                      தொடர்பு கொள்ளலாம். இந்த தளத்திற்கு வெளியே உங்கள் தகவல் பகிரப்படாது என்பதை
                      உறுதிப்படுத்துகிறோம்.
                    </Typography>
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
                  padding: 2,
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
                      <PhoneInput
                        defaultCountry='IN'
                        value={volunteerPhone}
                        onChange={(e: string) => {
                          if (e && e.length === 13) {
                            setVolunteerPhone(e.replace('+91', ''))
                          }
                        }}
                        placeholder='Enter Phone Number'
                      />
                      {/* <TextField
                margin='normal'
                fullWidth
                autoFocus
                id='volunteer-phone'
                label='Phone'
                variant='outlined'
                value={volunteerPhone}
                onChange={(e) => {
                  setVolunteerPhone(e.target.value)
                  setPhoneNumberValidate(true)
                  e.preventDefault()
                }}
                error={volunteerPhone.length !== 0 && !/^\d{10}$/.test(volunteerPhone)}
                helperText={
                  volunteerPhone.length !== 0 && !/^\d{10}$/.test(volunteerPhone)
                    ? 'Please enter a valid phone number'
                    : ''
                }
                required
              /> */}
                      <div>
                        <div className='otp-button'>
                          <Button variant='contained' onClick={handleOtp} color='primary'>
                            Get OTP
                          </Button>
                          <div id='recaptcha-container'></div>
                        </div>
                        {otpOpener ? (
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
                            />
                            <Button variant='contained' onClick={verifyOtp} color='primary'>
                              Verify OTP
                            </Button>
                          </div>
                        ) : null}
                      </div>
                      {validate ? (
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
