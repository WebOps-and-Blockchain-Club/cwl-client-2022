import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import '../../styles/ComplaintPortal/cp_style.css'

const Address = ({
  area,
  locality,
  street,
  address,
  handleAreaChange,
  handleLocalityChange,
  handleStreetChange,
  handleAddressChange,
  activeStep,
  setActiveStep,
}: {
  area: any
  locality: any
  street: any
  address: any
  handleAreaChange: any
  handleLocalityChange: any
  handleStreetChange: any
  handleAddressChange: any

  activeStep: any
  setActiveStep: any
}) => {
  const handlePrev = () => {
    setActiveStep(activeStep - 1)
  }

  const handleNext = () => {
    if (area.trim().length !== 0) {
      if (locality.trim().length !== 0) {
        if (street.trim().length !== 0) {
          setActiveStep(activeStep + 1)
        }
      }
    }
  }

  return (
    <div className='page'>
      <div className='text'>
        <TextField
          name='area'
          id='area'
          value={area}
          fullWidth
          margin='normal'
          label='Area'
          variant='outlined'
          onChange={handleAreaChange}
          type='text'
          error={area.trim().length === 0}
          helperText={area.trim().length === 0 ? 'Please enter a valid area' : ''}
          required
        />
      </div>
      <div className='text'>
        <TextField
          name='locality'
          id='locality'
          value={locality}
          fullWidth
          margin='normal'
          label='Locality'
          variant='outlined'
          onChange={handleLocalityChange}
          error={locality.trim().length === 0}
          helperText={locality.trim().length === 0 ? 'Please enter a valid locality' : ''}
          required
        />
      </div>
      <div className='text'>
        <TextField
          name='street'
          id='street'
          value={street}
          fullWidth
          margin='normal'
          label='Street '
          variant='outlined'
          onChange={handleStreetChange}
          error={street.trim().length === 0}
          helperText={street.trim().length === 0 ? 'Please enter a valid street' : ''}
          required
        />
      </div>
      <div className='text'>
        <TextField
          multiline
          name='address'
          id='address'
          value={address}
          fullWidth
          margin='normal'
          label='Your detailed location '
          variant='outlined'
          onChange={handleAddressChange}
        />
      </div>
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
        </Button>

        <Button
          color='primary'
          className='navigation'
          variant='contained'
          onClick={handleNext}
          fullWidth
          sx={{ height: 45 }}
          disabled={
            locality.trim().length == 0 || area.trim().length == 0 || street.trim().length == 0
              ? true
              : false
          }
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default Address
