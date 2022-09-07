import { TextField, Typography, Button, Paper } from '@mui/material'
import { shadows } from '@mui/system'
import InputAdornment from '@mui/material/InputAdornment'

import { useEffect, useState, useContext } from 'react'
import Data from '../../utils/Context'
import axios from 'axios'
import { useLocation } from 'wouter'
import NavBar from '../NavBar/NavBar'
import { AddAPhoto } from '@mui/icons-material'
import '../../styles/DataSubmission/DataSubmission.css'
import { blueGrey } from '@mui/material/colors'

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
  const paperStyle = {
    padding: '15px 20px 50px',
    width: 500,
    margin: '10vh auto',
    backgroundColor: '#b3e5fc',
  }
  return (
    <div className='data-page'>
      <NavBar />
      <Paper className='paper' elevation={20} style={paperStyle}>
        <div className='title'>
          <Typography variant='h3' sx={{ fontWeight: 'bold', justifyContent: 'center' }}>
            Water in My Area
          </Typography>
        </div>
        <div className='input'>
          <TextField
            color='primary'
            placeholder='ft'
            // label='in feet'
            variant='outlined'
            onChange={(e) => setDepth(parseFloat(e.target.value))}
            sx={{ boxShadow: 15, borderRadius: 5, outline: 'none' }}
            InputProps={{
              endAdornment: <InputAdornment position='end'>ft</InputAdornment>,
              style: {
                fontSize: 50,
                width: '25rem',
                textAlign: 'center',
                color: '#4fc3f7',
                backgroundColor: '#ffffff',
                borderRadius: 10,
              },
            }}
            inputProps={{
              style: {
                fontSize: 50,
                width: '25rem',
                textAlign: 'center',
                color: '#4fc3f7',
                backgroundColor: '#ffffff',
                borderRadius: 10,
              },
              '&:focus': {
                outline: 'none',
              },
            }}
          />
        </div>
        <div className='button'>
          <div className='upload'>
            <Button
              variant='contained'
              component='label'
              color='primary'
              sx={{ fontSize: 17, height: 50 }}
            >
              <AddAPhoto fontSize='large' /> upload
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

          <div className='submit'>
            <Button
              variant='contained'
              color='primary'
              onClick={handleSubmit}
              sx={{ fontSize: 18, height: 50, width: 140 }}
            >
              Submit
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  )
}
export default DataSubmission
