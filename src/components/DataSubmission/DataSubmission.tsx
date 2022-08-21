import { TextField, Typography, Button } from '@mui/material'
import { useEffect, useState, useContext } from 'react'
import Data from '../../utils/Context'
import axios from 'axios'
import { useLocation } from 'wouter'
const DataSubmission = (): JSX.Element => {
  const { coord, setCoord } = useContext(Data)
  const [depth, setDepth] = useState(0)
  const [, setFile] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [location, setLocation] = useLocation()
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        setCoord({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      })
    }
  }, [])
  const handleImageUpload = (e: { target: { files: any } }) => {
    setFile(e.target.files[0])
    setImageURL(URL.createObjectURL(e.target.files[0]))
    console.log(URL.createObjectURL(e.target.files[0]))
  }
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    axios
      .post('http://localhost:4000/waterLevelData', {
        lng: coord.lng,
        lat: coord.lat,
        depth,
        image: imageURL,
      })
      .then((data) => {
        console.log(data.data)
        setLocation('/')
      })
      .catch((err) => console.log(err))
  }
  return (
    <div>
      <div className='mx-auto'>
        <Typography variant='h5'>Submit Your Area Water Level Data </Typography>
      </div>
      <div>
        <div></div>
        <div>
          <TextField
            color='success'
            label='Water Level'
            variant='outlined'
            onChange={(e) => setDepth(parseFloat(e.target.value))}
          />
          <div>
            <Button variant='contained' component='label' color='success'>
              Upload Image
              <input
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
                required
                name='image'
                hidden
              />
            </Button>
            {imageURL && (
              <div>
                <img src={imageURL} alt='image' />
              </div>
            )}
          </div>
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
