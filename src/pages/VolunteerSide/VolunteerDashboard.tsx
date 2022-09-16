import React from 'react'
import { Button, Typography } from '@mui/material'
import VolunteerTable from './VolunteerTable'
import Box from '@mui/material/Box'
import { useQuery } from '@apollo/client'
import { GetIssuesDocument } from '../../generated'

function VolunteerDashboard() {
  const { data: issues } = useQuery(GetIssuesDocument)
  return (
    <div>
      <Typography
        component='h1'
        variant='h3'
        align='center'
        style={{ fontFamily: '"Times New Roman", Times, serif', textAlign: 'center' }}
      >
        Volunteer Dashboard
      </Typography>
      <Box textAlign='right' style={{ paddingRight: '30px', paddingBottom: '20px' }}>
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

      <div
        style={{
          display: 'flexColumn',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          paddingLeft: '20px',
          borderRadius: '10px',
        }}
      >
        {issues && <VolunteerTable props={{ issues: issues?.getIssues }} />}
      </div>
    </div>
  )
}

export default VolunteerDashboard
