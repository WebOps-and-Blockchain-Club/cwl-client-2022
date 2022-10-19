import { useState } from 'react'
import Provision from '../../interfaces/VolunteerSide/Provision'
import DropDown from '../../components/DropDown'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '../../utils/FirebaseConfig'
import {
  Button,
  TextField,
  Typography,
  Paper,
  CssBaseline,
  Box,
  Container,
  Avatar,
} from '@mui/material'
import { Assignment } from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import '../../styles/VolunteerRegistrationForm.css'
import { useMutation } from '@apollo/client'
import { SignUpDocument } from '../../generated'
import PhoneInput from 'react-phone-number-input'
const theme = createTheme()
const paperStyles = {
  padding: '20px 40px',
  width: 575,
  margin: '40px auto',
  display: 'flex',
  borderRadius: '10px',
}
import 'react-phone-number-input/style.css'
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
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={20} style={paperStyles}>
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
                      names: ['Transportation', 'Plumbing', 'Swimming', 'Electrical', 'Others'],
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
                  <Box textAlign='center' style={{ paddingTop: '30px', paddingBottom: '20px' }}>
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
      </Paper>
    </ThemeProvider>
  )
}

export default VolunteerRegistrationForm
