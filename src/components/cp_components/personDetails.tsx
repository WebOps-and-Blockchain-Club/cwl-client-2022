import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import '../../styles/ComplaintPortal/cp_style.css'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import NavButtons from './navButtons'

// const [error, setError] = useState('')
// const handleError = (err: boolean) => {}

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
  name: any
  phone: any
  otp: any
  handleNameChange: any
  handlePhoneChange: any
  handleOtpChange: any

  activeStep: any
  setActiveStep: any
}) => {
  const handleNext = () => {
    if (!/^\d{10}$/.test(phone) === false) setActiveStep(activeStep + 1)
  }

  return (
    <form className='page'>
      <div className='text'>
        <TextField
          value={name}
          label='name'
          type='text'
          fullWidth
          margin='normal'
          variant='outlined'
          onChange={handleNameChange}
          // error={!!errors.name}
          // helperText={errors.name ? errors.name?.message : ''}
        />
      </div>

      <div className='text'>
        <TextField
          id='phone'
          value={phone}
          fullWidth
          margin='normal'
          autoFocus
          type='text'
          label='Phone'
          variant='outlined'
          onChange={handlePhoneChange}
          error={phone.length !== 0 && !/^\d{10}$/.test(phone)}
          helperText={!/^\d{10}$/.test(phone) ? 'Please enter a phone number' : ''}
          required
        />
      </div>
      <div className='otp'>
        <div className='otp-text'>
          <TextField
            id='otp'
            value={otp}
            fullWidth
            margin='normal'
            label='Enter your OTP '
            variant='outlined'
            onChange={handleOtpChange}
            // error={!!errors.otp}
            // helperText={errors.otp ? errors.otp?.message : ''}
          />
        </div>
        <div className='otp-button'>
          <Button variant='contained' color='primary'>
            Get OTP
          </Button>
        </div>
      </div>
      <div className='navButtons'>
        <Button
          color='primary'
          className='navigation'
          variant='contained'
          onClick={handleNext}
          fullWidth
          sx={{ height: 45 }}
        >
          Next
        </Button>{' '}
      </div>
    </form>
  )
}

export default PersonDetails
