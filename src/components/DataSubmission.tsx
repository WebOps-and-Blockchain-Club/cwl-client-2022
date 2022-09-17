import { TextField, Typography, Button, Paper, Slider, Grid, Box } from '@mui/material'

import { useEffect, useState, useContext } from 'react'
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
    padding: ' 10px 50px 0px 50px',
    // width: 500,
    margin: '1vh 30vh 0vh 30vh ',
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
            value={depth}
            variant='outlined'
            onChange={(e) => {
              setDepth(parseFloat(e.target.value))
            }}
            sx={{ boxShadow: 15, borderRadius: 5, outline: 'none' }}
            inputProps={{
              style: {
                fontSize: 25,
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
        <Grid container direction='row' className='waterarea'>
          <Grid item>
            <Box sx={{ height: '350px' }}>
              <div className='slider'>
                <Slider
                  orientation='vertical'
                  aria-label='Always visible'
                  min={0}
                  max={200}
                  value={depth}
                  //   getAriaValueText={depth}
                  valueLabelDisplay='on'
                  sx={{ height: '300px' }}
                  onChange={(e, depth) => {
                    e.preventDefault()
                    setDepth(depth as number)
                  }}
                />
              </div>
            </Box>
          </Grid>
          <Grid item>
            <Box className='car' sx={{ height: '300px', width: '600px' }}>
              <div>
                <Box sx={{ height: 300 - depth * 1.5, width: '600px' }}></Box>
              </div>
              <div className='water'>
                <Box sx={{ height: depth * 1.5, width: '600px', maxHeight: '300px' }}></Box>
              </div>
            </Box>
          </Grid>
        </Grid>{' '}
        <Grid item className='link'>
          <p>Log this as a complaint</p>{' '}
        </Grid>
        <Grid
          container
          direction='column'
          className='button'
          spacing='20'
          sx={{ paddingBottom: '20px' }}
        >
          <Grid item>
            <div className='upload '>
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
                <div className='image'>
                  <img src={imageURL} alt='image' width={'100px'} height={'100px'} />
                </div>
              )}
            </div>
          </Grid>
          <Grid item>
            <div className='submit '>
              <Button
                variant='contained'
                color='primary'
                onClick={handleSubmit}
                sx={{ fontSize: 18, height: 50, width: 140 }}
              >
                Submit
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
export default DataSubmission
