import React from 'react'
import {
  TextField,
  Button,
  createTheme,
  ThemeProvider,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import '../../styles/ComplaintPortal/cp_style.css'
import { lightBlue } from '@mui/material/colors'

const themes = createTheme({
  palette: {
    primary: {
      main: lightBlue[700],
    },
  },
})

const PersonDetails = ({
  name,
  phone,
  otp,
  handleNameChange,
  handlePhoneChange,
  handleOtpChange,
  activeStep,
  setActiveStep,
}: {
  name: any // eslint-disable-line
  phone: any // eslint-disable-line
  otp: any // eslint-disable-line
  handleNameChange: any // eslint-disable-line
  handlePhoneChange: any // eslint-disable-line
  handleOtpChange: any // eslint-disable-line
  activeStep: any // eslint-disable-line
  setActiveStep: any // eslint-disable-line
}) => {
  const handlePrev = () => {
    setActiveStep(activeStep - 1)
  }
  const handleNext = () => {
    if (!/^\d{10}$/.test(phone) === false) setActiveStep(activeStep + 1)
  }
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <div className='page'>
      <ThemeProvider theme={themes}>
        <div className='text'>
          <TextField
            value={name}
            label='Name'
            type='text'
            fullWidth
            margin='normal'
            variant='outlined'
            onChange={(e) => {
              handleNameChange(e)
            }}
          />
          <TextField
            id='phone'
            value={phone}
            fullWidth
            margin='normal'
            autoFocus
            type='text'
            label='Phone'
            variant='outlined'
            onChange={(e) => {
              handlePhoneChange(e)
            }}
            error={phone.length !== 0 && !/^\d{10}$/.test(phone)}
            helperText={!/^\d{10}$/.test(phone) ? 'Please enter a phone number' : ''}
            required
          />
        </div>
        <div className='otp'>
          <Grid
            container
            direction='row'
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Grid item xs={6}>
              <div className='otp-text'>
                <TextField
                  id='otp'
                  value={otp}
                  fullWidth
                  margin='normal'
                  label='Enter your OTP '
                  variant='outlined'
                  onChange={(e) => handleOtpChange(e)}
                />
              </div>
            </Grid>
            <Grid item>
              <div className='otp-button'>
                <Button variant='contained' color='primary'>
                  Get OTP
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className='navButtons'>
          <Button
            disabled={activeStep === 0}
            onClick={handlePrev}
            className='prevBtn'
            color='primary'
            fullWidth
            sx={{ height: 45 }}
          >
            Back
          </Button>

          <Button
            color='primary'
            className='navigation'
            variant='contained'
            onClick={handleNext}
            fullWidth
            sx={{ height: 45 }}
            disabled={!/^\d{10}$/.test(phone) || (phone.length !== 0) === false ? true : false}
          >
            Next
          </Button>
        </div>
      </ThemeProvider>
    </div>
  )
}

export default PersonDetails
