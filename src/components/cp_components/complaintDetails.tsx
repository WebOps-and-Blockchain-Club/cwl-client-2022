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
}: {
  complaint: any
  complaintDetails: any
  handleComplaintChange: any
  handleComplaintDetailsChange: any
  imageURL: any
  handleImageUpload: any
}) => {
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
          //   disabled={true}
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
      </div>
    </div>
  )
}

export default ComplaintDetails
