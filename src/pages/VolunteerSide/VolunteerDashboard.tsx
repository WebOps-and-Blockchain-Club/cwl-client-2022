import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import { Button } from '@mui/material'
import Volunteer from '../../interfaces/VolunteerSide/Volunteer'
import useCheckUser from '../../hooks/useCheckUser'

function VolunteerDashboard() {
  const user: Volunteer | null = useCheckUser()
  const navigate = useNavigate()
  if (!user) {
    navigate('/login')
  }
  // const user: Volunteer = JSON.parse(localStorage.getItem('USER')!) // eslint-disable-line
  const idString: string | undefined = useParams().id
  let ID = 0
  if (!idString || parseInt(idString) !== user?.id) {
    navigate('/login')
  } else {
    ID = parseInt(idString) // eslint-disable-line
  }

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ fontSize: '40px', textAlign: 'center', border: '1px solid red' }}>
          Dashboard
        </div>
        <div style={{ border: '1px solid green', width: '80%' }}></div>
        <div style={{ textAlign: 'right', border: '1px solid blue' }}>
          <Button
            variant='contained'
            style={{ fontSize: '20px' }}
            onClick={() => {
              localStorage.removeItem('USER')
              navigate('/login')
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      <div>
        <div style={{ border: '1px solid black' }}></div>
      </div>
    </>
  )
}

export default VolunteerDashboard
