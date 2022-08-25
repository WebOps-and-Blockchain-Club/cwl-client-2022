import React, { useState } from 'react'
import { TextField, Grid,  } from '@mui/material'
import '../../styles/cp_style.css'

const PersonDetails = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')

  const handleNameChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setName(e.target.value)
  }
  const handlePhoneChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setPhone(e.target.value)
  }
  const handleOtpChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setOtp(e.target.value)
  }

  return (
    <Grid container className='page'>
      <Grid container direction='row' alignItems='center' alignContent='center'>
        <Grid item xs={2}>
          <h3>Name: </h3>
        </Grid>
        <Grid item xs={10}>
          <TextField
            name='name'
            id='name'
            value={name}
            fullWidth
            margin='normal'
            label='Enter your name'
            variant='filled'
            onChange={handleNameChange}
            // disabled={formSubmitted}
          />
        </Grid>
      </Grid>{' '}
      <Grid container direction='row' alignItems='center'>
        <Grid item xs={2}>
          <h3>Phone Number: </h3>
        </Grid>
        <Grid item xs={10}>
          <TextField
            name='phone'
            id='phone'
            value={phone}
            fullWidth
            margin='normal'
            label='Enter your phone number '
            variant='filled'
            onChange={handlePhoneChange}
            // disabled={formSubmitted}
          />
        </Grid>
      </Grid>{' '}
      <Grid container direction='row' alignItems='center'>
        <Grid item xs={2}>
          <h3>OTP: </h3>
        </Grid>
        <Grid item xs={10}>
          <TextField
            name='otp'
            id='otp'
            value={otp}
            fullWidth
            margin='normal'
            label='Enter your OTP '
            variant='filled'
            onChange={handleOtpChange}
            // disabled={formSubmitted}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PersonDetails
