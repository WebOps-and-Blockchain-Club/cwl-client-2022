import React from 'react'
import { Button } from '@mui/material'
import ComplaintTable from './ComplaintTable'
import Box from '@mui/material/Box'
import { useQuery } from '@apollo/client'
import { GetIssuesDocument } from '../../generated'

function CompliantDashboard() {
  const { data: issues } = useQuery(GetIssuesDocument)
  return (
    <div>
      <Box textAlign='right' style={{ paddingRight: '30px', paddingBottom: '20px' }}>
        <Button
          variant='contained'
          size='large'
          color='primary'
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
        {issues && <ComplaintTable props={{ issues: issues?.getIssues }} />}
      </div>
    </div>
  )
}

export default CompliantDashboard
