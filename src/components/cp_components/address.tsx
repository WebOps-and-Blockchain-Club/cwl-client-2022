import React, { useState } from 'react'
import { TextField } from '@mui/material'
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
}: {
  area: any
  locality: any
  street: any
  address: any
  handleAreaChange: any
  handleLocalityChange: any
  handleStreetChange: any
  handleAddressChange: any
}) => {
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
          disabled={true}
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
          disabled={true}
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
          disabled={true}
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
    </div>
  )
}

export default Address
