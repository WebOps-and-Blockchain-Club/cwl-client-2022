import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'
import '../../styles/ComplaintPortal/cp_style.css'

const ComplaintDetails = ({
  complaint,
  complaintDetails,
  handleComplaintChange,
  handleComplaintDetailsChange,
  imageURL,
  handleImageUpload,
  activeStep,
  setActiveStep,
  handleSubmit,
}: {
  complaint: any
  complaintDetails: any
  handleComplaintChange: any
  handleComplaintDetailsChange: any
  imageURL: any
  handleImageUpload: any
  activeStep: any

  setActiveStep: any
  handleSubmit: any
}) => {
  const handlePrev = () => {
    setActiveStep(activeStep - 1)
  }

  const handleFormSubmit = (e: any) => {
    if (complaint.trim().length !== 0) {
      handleSubmit()
    }
  }

  return (
    <div className='page'>
      <div className='text'>
        <TextField
          name='complaint'
          id='complaint'
          value={complaint}
          fullWidth
          margin='normal'
          label='Complaint'
          variant='outlined'
          onChange={handleComplaintChange}
          error={complaint.trim().length === 0}
          helperText={complaint.trim().length === 0 ? 'Please enter a complaint' : ''}
          required
        />
      </div>
      <div className='text'>
        <TextField
          multiline
          name='complaintDetails'
          id='complaintDetails'
          value={complaintDetails}
          fullWidth
          margin='normal'
          label='Complaint Details (max 400 words)'
          variant='outlined'
          onChange={handleComplaintDetailsChange}
        />
      </div>
      <div className='upload button'>
        <Button variant='contained' component='label' color='primary' sx={{ fontSize: 17 }}>
          <PhotoCamera fontSize='large' /> upload
          <input type='file' accept='image/*' onChange={handleImageUpload} name='image' hidden />
        </Button>
        {imageURL && (
          <div className='image'>
            <img src={imageURL} alt='image' width={'auto'} height={'100px'} />
          </div>
        )}
      </div>{' '}
      <div className='navButtons'>
        <Button
          disabled={activeStep === 0}
          onClick={handlePrev}
          className='prevBtn'
          color='primary'
          fullWidth
          sx={{ height: 45 }}
        >
          Back
        </Button>{' '}
        <Button
          type='submit'
          color='primary'
          className='navigation'
          variant='contained'
          onSubmit={handleFormSubmit}
          fullWidth
          sx={{ height: 45 }}
          disabled={complaint.trim().length === 0 ? true : false}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default ComplaintDetails
