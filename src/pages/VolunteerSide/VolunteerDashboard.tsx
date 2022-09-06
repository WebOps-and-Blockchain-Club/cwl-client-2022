import React from 'react'
import { useLocation } from 'wouter'
import { Button, Paper, Typography } from '@mui/material'
import VolunteerTable from './VolunteerTable'
import Box from '@mui/material/Box'
function VolunteerDashboard() {
  // eslint-disable-line

  return (
    <>
      <Typography
        component='h1'
        variant='h3'
        align='center'
        style={{ fontFamily: '"Times New Roman", Times, serif', textAlign: 'center' }}
      >
        Volunteer Dashboard
      </Typography>
      {/* <div style={{ display: 'flex', marginBottom: '10px' }}> */}
      <Box textAlign='right' style={{ paddingRight: '40px',paddingBottom:'20px' }}>
        <Button
          variant='contained'
          size='large'
          onClick={() => {
            localStorage.removeItem('USER')
            window.location.reload()
          }}
        >
          Logout
        </Button>
      </Box>
      {/* </div> */}
    
        <VolunteerTable/>
     
      <div>
        <div style={{ border: '1px solid black' }}></div>
      </div>
    </>
  )
}

export default VolunteerDashboard
