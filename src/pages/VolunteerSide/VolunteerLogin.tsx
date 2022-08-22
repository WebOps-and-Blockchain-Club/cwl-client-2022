import React, { useState } from 'react'
// import { Button, TextField } from '@mui/material'
import Volunteer from '../../interfaces/VolunteerSide/Volunteer'
// import React, { useState } from "react";
import { TextField, Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles: any = makeStyles({
  main: {
    // background: '#90EE90',
    // border: 0,
    // borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // color: 'white',
    // height:  ,
    textAlign: 'center',
    margin: 'auto',
    padding: '0 100px',
    // alignItems: 'center',
  },
  content: {},
})
// eslint-disable-next-line
function VolunteerLogin({ volunteerList, err }: { volunteerList: Volunteer[] | null; err: any }) {
  const [volunteerPhone, setVolunteerPhone]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ] = useState('')

  const classes = useStyles()
  const [volunteerName, setVolunteerName]: [string, any] = useState('')

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
      const res = volunteerList.some((volunteer: Volunteer): boolean => {
        if (volunteer.phoneNumber === volunteerPhone) {
          if (volunteer.password === volunteerPassword) {
            localStorage.setItem('USER', JSON.stringify(volunteer))
            console.log('Login successful')
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
        <Typography
          variant='h4'
          style={{ textAlign: 'center', paddingBottom: '35px', padding: '20px' }}
        >
          Volunteer Login
        </Typography>
        <div className={classes.main}>
          <div>
            <TextField
              style={{ paddingBottom: '20px' }}
              type='text'
              name='volunteer-name'
              id='volunteer-name'
              value={volunteerName}
              onChange={(e) => {
                setVolunteerName(e.target.value)
                e.preventDefault()
              }}
              required
              label='Name'
              color='success'
              variant='outlined'
            />
          </div>
          <div>
            <TextField
              style={{ paddingBottom: '20px' }}
              label='Phone No.'
              variant='outlined'
              type='text'
              name='volunteer-phone'
              id='volunteer-phone'
              color='success'
              value={volunteerPhone}
              onChange={(e) => {
                setVolunteerPhone(e.target.value)
                e.preventDefault()
              }}
              required
            />
          </div>
          <div>
            <Button
              variant='contained'
              disabled={!(volunteerName && volunteerPhone)}
              color='success'
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default VolunteerLogin
