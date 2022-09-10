import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import '../../styles/ComplaintPortal/cp_style.css'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import NavButtons from './navButtons'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

interface FormValues {
  name: string
  phone: number
  otp: string
}

const schema = yup.object().shape({
  name: yup.string().required(),
  phone: yup.string(),
  otp: yup.string(), // need validation over here
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
  tabs,
}: {
  name: any
  phone: any
  otp: any
  handleNameChange: any
  handlePhoneChange: any
  handleOtpChange: any

  activeStep: any
  setActiveStep: any
  tabs: any
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) })

  const formSubmitHandler: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log(data)
  }
  const handleNext = () => {
    console.log(errors)
    if (errors) console.log('error')
    else setActiveStep(1)
  }

  return (
    <form className='page' onSubmit={handleSubmit(formSubmitHandler)}>
      <div className='text'>
        <Controller
          name='name'
          // defaultValue=''
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={name}
              label='name'
              type='text'
              fullWidth
              margin='normal'
              variant='outlined'
              onChange={handleNameChange}
              error={!!errors.name}
              helperText={errors.name ? errors.name?.message : ''}
            />
          )}
        />
      </div>

      <div className='text'>
        <Controller
          name='phone'
          // defaultValue=''
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id='phone'
              value={phone}
              fullWidth
              margin='normal'
              type='number'
              label='phone'
              variant='outlined'
              onChange={handlePhoneChange}
              error={!!errors.phone}
              helperText={errors.phone ? errors.phone?.message : ''}
            />
          )}
        />
      </div>
      <div className='otp'>
        <div className='otp-text'>
          <Controller
            name='otp'
            // defaultValue=''
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id='otp'
                value={otp}
                fullWidth
                margin='normal'
                label='Enter your OTP '
                variant='outlined'
                onChange={handleOtpChange}
                error={!!errors.otp}
                helperText={errors.otp ? errors.otp?.message : ''}
              />
            )}
          />
        </div>
        <div className='otp-button'>
          <Button variant='contained' color='primary'>
            Get OTP
          </Button>
        </div>
      </div>
      <input type='submit' />
      <div className='navButtons'>
        <Button
          color='primary'
          type='submit'
          className='navigation'
          variant='contained'
          onClick={handleNext}
          fullWidth
          sx={{ height: 45 }}
        >
          {/* <input type='submit' /> */}
          Next
        </Button>
      </div>
    </form>
  )
}

export default PersonDetails
