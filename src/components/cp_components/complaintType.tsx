import { useState, useReducer } from 'react'
import { Grid, Button, Typography } from '@mui/material'
import '../../styles/cp_style.css'

const complaints = [
  { id: 1, name: 'Street Light', state: false },
  { id: 2, name: 'Water Logging', state: true },
  { id: 3, name: 'Electricity', state: false },
  { id: 4, name: 'Food', state: false },
  { id: 5, name: 'Drains', state: false },
  { id: 6, name: 'Shelter', state: false },
  { id: 7, name: 'General', state: false },
  { id: 8, name: 'Road and Footpath', state: false },
]

function problemReducer(state: any, complaint: any) {
  return [...state, complaint]
}

const ComplaintType = () => {
  const [problem, setProblem] = useReducer(problemReducer, [complaints])

  function handleChange(complaint: { id?: number; name?: string; state: any }) {
    const state = !complaint.state
    setProblem((complaint.state = state))
  }

  return (
    <Grid container alignItems='center' justifyContent='center'>
      <Grid item display='flex' xs={12} sm={10} md={10}>
        <Typography variant='h6'>Select your complaint type:</Typography>
      </Grid>
      {complaints.map((complaint) => (
        <Grid item key={complaint.id} display='flex' xs={7} sm={5} md={5}>
          <Button
            sx={{ width: 200, padding: 0.5, margin: 0.5 }}
            key={complaint.id}
            onClick={() => handleChange(complaint)}
            variant={complaint.state ? 'contained' : 'outlined'}
            color='success'
          >
            {complaint.name}
          </Button>
        </Grid>
      ))}
    </Grid>
  )
}

export default ComplaintType
