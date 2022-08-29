// import { useState } from 'react'
import { Grid, Button, Typography } from '@mui/material'
import '../../styles/cp_style.css'

const complaint = [
  { id: 1, name: 'Street Light', state: false },
  { id: 2, name: 'Water Logging', state: true },
  { id: 3, name: 'Electricity', state: false },
  { id: 4, name: 'Food', state: false },
  { id: 5, name: 'Drains', state: false },
  { id: 6, name: 'Shelter', state: false },
  { id: 7, name: 'General', state: false },
  { id: 8, name: 'Road and Footpath', state: false },
]

const ComplaintType = () => {
  //   const [state, setState] = useState({ complaint })

  //   const handleChange = (id: number) => (e: { preventdefault: () => void }) => {
  //     e.preventdefault()
  //     setState((state) => ({
  //       ...state,
  //       state: !state,
  //     }))
  //   }

  return (
    <Grid container alignItems='center' justifyContent='center'>
      <Grid item display='flex' xs={12} sm={10} md={10}>
        <Typography variant='h6'>Select your complaint type:</Typography>
      </Grid>
      {complaint.map((complaint) => (
        <Grid item key={complaint.id} display='flex' xs={7} sm={5} md={5}>
          <Button
            sx={{ width: 200, padding: 0.5, margin: 0.5 }}
            key={complaint.id}
            // onClick={handleChange(complaint.id)}
            variant={complaint.state ? 'contained' : 'outlined'}
          >
            {complaint.name}
          </Button>
        </Grid>
      ))}
    </Grid>
  )
}

export default ComplaintType
