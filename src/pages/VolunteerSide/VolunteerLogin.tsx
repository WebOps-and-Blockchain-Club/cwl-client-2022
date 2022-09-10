import React, { useState, useEffect } from 'react'
// import { ApolloProvider } from 'react-apollo'
import { useQuery } from '@apollo/client'
import { LoginDocument } from '../../generated'
import { Button, TextField } from '@mui/material'
import Volunteer from '../../interfaces/VolunteerSide/Volunteer'
import { useLocation } from 'wouter'

// eslint-disable-next-line
function VolunteerLogin({ err }: { err: any }) {
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
  const { data } = useQuery(LoginDocument, {
    variables: {
      loginInput: {
        phoneNumber: volunteerPhone,
        password: volunteerPassword,
      },
    },
  })

  console.log(data)

  const handleSubmit = (): void => {
    try {
      if (data?.login.success) {
        const volunteer: Volunteer = {
          phoneNumber: volunteerPhone,
          username: data?.login.username,
          // tags: JSON.parse(data?.login.tags),
          tags: ['Food', 'Shelter'],
        }
        localStorage.setItem('USER', JSON.stringify(volunteer))
        console.log('Login successful')
      }
      console.log('Reaching')
      console.log(data)
      window.location.reload()

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
