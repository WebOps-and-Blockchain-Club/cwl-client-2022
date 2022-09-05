import React, { useState } from 'react'
import { TextField, Grid, Button } from '@mui/material'
import '../../styles/cp_style.css'

const PersonDetails = () => {
  const [name, setName] = useState({ name: '' })
  const [phone, setPhone] = useState({ phone: '', state: 'false' })
  const [otp, setOtp] = useState({ otp: '', state: 'false' })

  const [error, setError] = useState(false)

  const handleNameChange = (e: { target: { value: React.SetStateAction<{ name: string }> } }) => {
    setName(e.target.value)
  }
  // const handlePhoneChange = (e: { target: { value: React.SetStateAction<string> } }) => {
  //   setPhone(e.target.value)
  // }
  // const handleOtpChange = (e: { target: { value: React.SetStateAction<string> } }) => {
  //   setOtp(e.target.value)
  // }

  return (
    <Grid container className='page'>
      <Grid item xs={10} sm={10} md={10}>
        <TextField
          name='name'
          id='name'
          value={name}
          fullWidth
          margin='normal'
          label='Name'
          variant='filled'
          // onChange={handleNameChange}
          error={error === true}
          helperText={error ? 'Please enter your name' : ''}
        />
      </Grid>{' '}
      <Grid item xs={10} sm={10} md={10}>
        <TextField
          name='phone'
          id='phone'
          value={phone}
          fullWidth
          margin='normal'
          label='Enter your phone number '
          variant='filled'
          // onChange={handlePhoneChange}
        />
      </Grid>{' '}
      <Grid container direction='row' alignItems='center' justifyContent='center'>
        <Grid item xs={6} sm={7} md={7}>
          <TextField
            name='otp'
            id='otp'
            value={otp}
            fullWidth
            margin='normal'
            label='Enter your OTP '
            variant='filled'
            // onChange={handleOtpChange}
          />
        </Grid>
        <Grid item xs={4} sm={3} md={3}>
          <Button variant='contained' color='success'>
            Get OTP
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PersonDetails
