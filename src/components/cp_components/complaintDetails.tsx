import React, { useState } from 'react'
import { TextField, Grid, Button } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'
import '../../styles/cp_style.css'

const ComplaintDetails = () => {
  const [complaint, setComplaint] = useState('')
  const [complaintDetails, setComplaintDetails] = useState('')

  const handleComplaintChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setComplaint(e.target.value)
  }
  const handleComplaintDetailsChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setComplaintDetails(e.target.value)
  }

  return (
    <Grid container className='page'>
      <Grid item xs={10} sm={10} md={10}>
        <TextField
          name='complaint'
          id='complaint'
          value={complaint}
          required
          fullWidth
          margin='normal'
          label='Complaint'
          variant='filled'
          onChange={handleComplaintChange}
          //   disabled={true}
        />
      </Grid>{' '}
      <Grid item xs={10} sm={10} md={10}>
        <TextField
          multiline
          name='complaintDetails'
          id='complaintDetails'
          value={complaintDetails}
          fullWidth
          margin='normal'
          label='Complaint Details (max 400 words)'
          variant='filled'
          onChange={handleComplaintDetailsChange}
        />
      </Grid>
      <Grid item xs={10} sm={10} md={10}>
        <Button
          sx={{ borderRadius: 1, margin: 2 }}
          variant='contained'
          startIcon={<PhotoCamera />}
          color='success'
        >
          Upload
        </Button>
      </Grid>
    </Grid>
  )
}

export default ComplaintDetails
