import { TextField, Typography, Button } from '@mui/material'
import { useEffect, useState, useContext } from 'react'
import Data from '../../utils/Context'
const DataSubmission = (): JSX.Element => {
  const { location, setLocation } = useContext(Data)
  const [file, setFile] = useState()
  const [imageURL, setImageURL] = useState('')
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      })
    }
  }, [])
  const handleImageUpload = (e: any) => {
    setFile(e.target.files[0])
    setImageURL(URL.createObjectURL(e.target.files[0]))
    console.log(URL.createObjectURL(e.target.files[0]))
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
        <div>
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
