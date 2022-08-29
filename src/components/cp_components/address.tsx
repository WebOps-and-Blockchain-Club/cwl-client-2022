import React, { useState } from 'react'
import { TextField, Grid } from '@mui/material'
import '../../styles/cp_style.css'

const Address = () => {
  const [area, setArea] = useState('your area')
  const [locality, setLocality] = useState('your locality')
  const [street, setStreet] = useState('your street')
  const [address, setAddress] = useState('')

  const handleAreaChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setArea(e.target.value)
  }
  const handleLocalityChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setLocality(e.target.value)
  }
  const handleStreetChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setStreet(e.target.value)
  }
  const handleAddressChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setAddress(e.target.value)
  }

  return (
    <Grid container className='page'>
      <Grid item xs={10} sm={10} md={10}>
        <TextField
          name='area'
          id='area'
          value={area}
          fullWidth
          margin='normal'
          label='Area'
          variant='filled'
          onChange={handleAreaChange}
          disabled={true}
        />
      </Grid>{' '}
      <Grid item xs={10} sm={10} md={10}>
        <TextField
          name='locality'
          id='locality'
          value={locality}
          fullWidth
          margin='normal'
          label='Locality'
          variant='filled'
          onChange={handleLocalityChange}
          disabled={true}
        />
      </Grid>{' '}
      <Grid item xs={10} sm={10} md={10}>
        <TextField
          name='street'
          id='street'
          value={street}
          fullWidth
          margin='normal'
          label='Street '
          variant='filled'
          onChange={handleStreetChange}
          disabled={true}
        />
      </Grid>{' '}
      <Grid item xs={10} sm={10} md={10}>
        <TextField
          multiline
          name='address'
          id='address'
          value={address}
          fullWidth
          margin='normal'
          label='Your detailed location '
          variant='filled'
          onChange={handleAddressChange}
        />
      </Grid>
    </Grid>
  )
}

export default Address
