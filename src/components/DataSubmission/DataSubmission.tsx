import { TextField, Typography, Button } from '@mui/material'
import { useEffect, useState } from 'react'
const DataSubmission = (): JSX.Element => {
  const [lat, setLat] = useState(13.0827)
  const [lng, setLng] = useState(80.2707)
  const [file, setFile] = useState()
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        setLat(position.coords.latitude)
        setLng(position.coords.longitude)
      })
    }
  }, [])
  const handleImageUpload = (e: any) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
  }
  return (
    <div>
      <div className='mx-auto'>
        <Typography variant='h5'>Submit Your Area Water Level Data </Typography>
      </div>
      <div>
        <div></div>
        <div >
          <TextField color='success' label='Water Level' variant='outlined' />
          <input type='file' accept='image/*' onChange={handleImageUpload} required name='image' />
        </div>
      </div>
      <div>
        <Button variant='contained' color='success' onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  )
}
export default DataSubmission
