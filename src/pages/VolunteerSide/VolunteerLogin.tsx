import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import Volunteer from '../../interfaces/VolunteerSide/Volunteer'
import { useLocation } from 'wouter'

// eslint-disable-next-line
function VolunteerLogin({ volunteerList, err }: { volunteerList: Volunteer[] | null; err: any }) {
  const [location, setLocation] = useLocation() // eslint-disable-line
  const [volunteerPhone, setVolunteerPhone]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ] = useState('')
  const [volunteerPassword, setVolunteerPassword]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ] = useState('')
  const [error, setError]: [string, React.Dispatch<React.SetStateAction<string>>] = useState(err)

  const handleSubmit = (): void => {
    if (!volunteerList) {
      return
    }
    try {
      console.log(volunteerList)
      const res = volunteerList.some((volunteer: Volunteer): boolean => {
       console.log(volunteer)
        if (volunteer.phoneNumber === volunteerPhone) {
          if (volunteer.password === volunteerPassword) {
            localStorage.setItem('USER', JSON.stringify(volunteer))
            console.log('Login successful')
            window.location.reload()
            console.log('Post redirect')
            return true
          }
          throw Error('Wrong password')
        }
        return false
      })
      if (!res) {
        throw Error('This user does not exist')
      }
      // eslint-disable-next-line
    } catch (error: any) {
      setError(error.message)
      console.error(error)
    }
  }

  return (
    <div>
      <form
        action='post'
        onSubmit={(e) => {
          handleSubmit()
          e.preventDefault()
        }}
      >
        <TextField
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
        <TextField
          id='volunteer-password'
          type='password'
          label='Password'
          variant='outlined'
          value={volunteerPassword}
          onChange={(e) => {
            setVolunteerPassword(e.target.value)
            e.preventDefault()
          }}
          autoComplete='current-password'
          required
        />
        <Button type='submit' variant='contained' disabled={!(volunteerPassword && volunteerPhone)}>
          Submit
        </Button>
      </form>
      <div style={{ color: 'red' }}>{error}</div>
    </div>
  )
}

export default VolunteerLogin