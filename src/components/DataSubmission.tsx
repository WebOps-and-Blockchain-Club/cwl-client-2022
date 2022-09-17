import { TextField, Typography, Button, Paper } from '@mui/material'
import { useEffect, useState, useContext, SetStateAction, Dispatch } from 'react'
import Data from '../utils/Context'
import { useLocation } from 'wouter'
import { AddAPhoto } from '@mui/icons-material'
import '../styles/DataSubmission.css'
import { useMutation, useQuery } from '@apollo/client'
import { GetS3UrlDocument, PostWaterDataDocument } from '../generated'

const DataSubmission = (): JSX.Element => {
  const { coord, setCoord } = useContext(Data)
  const [depth, setDepth] = useState(0)
  const [imageURL, setImageURL] = useState('')
  const [, setLocation] = useLocation()
  const { data } = useQuery(GetS3UrlDocument)

  const [postWaterData, { data: result }] = useMutation(PostWaterDataDocument, {
    variables: {
      waterDataInput: {
        location: JSON.stringify(coord),
        image: imageURL,
        depth,
      },
    },
  })

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

  // eslint-disable-next-line
  const handleImageUpload = async (file: any) => {
    const s3URL = data?.getS3URL
    await fetch(s3URL || '', {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: file,
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((e) => console.log(e))
    setImageURL((s3URL || '').split('?')[0])
  }

  // eslint-disable-next-line
  const handleSubmit = async (e: any) => {
    try {
      const { data } = await postWaterData({
        variables: {
          waterDataInput: {
            location: JSON.stringify(coord),
            image: imageURL,
            depth,
          },
        },
      })
      setLocation('/map')
    } catch (error) {
      console.error(error)
    }
  }

  const paperStyle = {
    padding: '15px 20px 50px',
    width: 500,
    margin: '10vh auto',
    backgroundColor: '#b3e5fc',
  }

  return (
    <div className='data-page'>
      <Paper className='paper' elevation={20} style={paperStyle}>
        <div className='title'>
          <Typography variant='h3' sx={{ fontWeight: 'bold', justifyContent: 'center' }}>
            Water in My Area
          </Typography>
        </div>
        <div className='input'>
          <TextField
            color='primary'
            placeholder='cm'
            variant='outlined'
            onChange={(e) => setDepth(parseFloat(e.target.value))}
            sx={{ boxShadow: 15, borderRadius: 5, outline: 'none' }}
            inputProps={{
              style: {
                fontSize: 50,
                width: '20rem',
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

        <div className='upload button'>
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
              // eslint-disable-next-line
              onChange={(e: { preventDefault: () => void; target: { files: any } }) => {
                e.preventDefault()
                const fileObject: File | null = e.target.files[0]
                handleImageUpload(fileObject)
              }}
              required
              name='image'
              hidden
            />
          </Button>
          {imageURL && (
            <div className='image'>
              <img src={imageURL} alt='image' width={'100px'} height={'100px'} />
            </div>
          )}
        </div>

        <div className='submit button'>
          <Button
            variant='contained'
            color='primary'
            onClick={(e) => {
              e.preventDefault()
              handleSubmit(e)
            }}
            sx={{ fontSize: 18, height: 50, width: 140 }}
          >
            Submit
          </Button>
        </div>
      </Paper>
    </div>
  )
}
export default DataSubmission
