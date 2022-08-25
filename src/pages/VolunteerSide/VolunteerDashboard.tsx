import React from 'react'
import { useLocation } from 'wouter'
import { Button } from '@mui/material'
import VolunteerTable from './VolunteerTable'

function VolunteerDashboard() {
  const [location, setLocation] = useLocation() // eslint-disable-line

  return (
    <>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <div style={{ fontSize: '40px', textAlign: 'center' }}>Dashboard</div>
        <div style={{ width: '80%' }}></div>
        <div style={{ textAlign: 'right' }}>
          <Button
            variant='contained'
            style={{ fontSize: '20px' }}
            onClick={() => {
              localStorage.removeItem('USER')
              window.location.reload()
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      <VolunteerTable />
      <div>
        <div style={{ border: '1px solid black' }}></div>
      </div>
    </>
  )
}

export default VolunteerDashboard
