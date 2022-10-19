import {
  TextField,
  Typography,
  Button,
  Slider,
  Grid,
  Box,
  Tab,
  createTheme,
  ThemeProvider,
} from '@mui/material'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useEffect, useState, useContext } from 'react'
import Data from '../utils/Context'
import Language from '../utils/lang'
import { AddAPhoto } from '@mui/icons-material'
import '../styles/DataSubmission.css'
import { useMutation, useQuery } from '@apollo/client'
import { GetS3UrlDocument, PostWaterDataDocument } from '../generated'
import Modal_ from '../components/Modal'
import { lightBlue } from '@mui/material/colors'

const themes = createTheme({
  palette: {
    primary: {
      main: lightBlue[700],
    },
  },
})

const DataSubmission = (): JSX.Element => {
  const { coord, setCoord } = useContext(Data)
  const { checked } = useContext(Language)
  const [depth, setDepth] = useState(0)
  const [imageURL, setImageURL] = useState('')
  const { data } = useQuery(GetS3UrlDocument)
  const [error, setError] = checked ? useState('Enter Water level') : useState('நீர்மடட்டம் தேவை')
  const [open, setOpen] = useState(false)
  const [text, setText] = useState({
    heading: 'Location Required',
    body: 'Water level data submission requires location access',
  })
  const [postWaterData] = useMutation(PostWaterDataDocument, {
    variables: {
      waterDataInput: {
        location: JSON.stringify(coord),
        image: imageURL,
        depth,
      },
    },
  })
  const [value, setValue] = useState('1')
  const [colour, setColor] = useState('#47B5FF')

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
      .then((res) => {
        console.log(res)
      })
      .catch((e) => console.log(e))
    setImageURL((s3URL || '').split('?')[0])
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  // eslint-disable-next-line
  const handleSubmit = async (e: any) => {
    if (coord.lat === 13.0827 && coord.lng === 80.2707) {
      setOpen(true)
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
          setCoord({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        })
        setOpen(false)
      }

      try {
        await postWaterData({
          variables: {
            waterDataInput: {
              location: JSON.stringify(coord),
              image: imageURL,
              depth,
            },
          },
        })
        setText({
          heading: 'Data Submitted',
          body: `Water level in the given area is updated as ${depth} cm. See the map to see your data.`,
        })
        setOpen(true)
        // window.location.reload()
      } catch (error) {
        console.error(error)
      }
    }
  }
  return (
    <div className='data-page'>
      <ThemeProvider theme={themes}>
        <Grid container direction='column' className='waterarea' spacing='20' item>
          <Grid item>
            <div className='title'>
              {checked ? (
                <Typography
                  variant='h3'
                  sx={{
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    fontSize: '2em',
                    color: '#0288d1',
                  }}
                >
                  Water in My Area
                </Typography>
              ) : (
                <Typography
                  variant='h4'
                  sx={{
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    fontSize: '1.3em',
                    color: '#0288d1',
                  }}
                >
                  எனது பகுதியில் நீர்மட்டம்
                </Typography>
              )}
            </div>
            <div className='input'>
              <TextField
                color='primary'
                placeholder='cm'
                value={depth}
                variant='outlined'
                // eslint-disable-next-line
                onChange={(e: { target: { value: any } }) => {
                  if (parseFloat(e.target.value) == 0) {
                    setError('Enter Water level')
                  } else if (parseFloat(e.target.value) > 200) {
                    setError('Water Level should be less than 200cm')
                  } else if (!isNaN(parseFloat(e.target.value))) {
                    setDepth(parseFloat(e.target.value))
                    if (
                      error === 'Water Level should be less than 200cm' ||
                      error === 'Enter Water level'
                    ) {
                      setError('')
                    }
                  } else {
                    setDepth(0)
                  }
                }}
                sx={{ boxShadow: 15, borderRadius: 5, outline: 'none' }}
                inputProps={{
                  style: {
                    fontSize: 25,
                    width: '225px',
                    textAlign: 'center',
                    color: '#4fc3f7',
                    backgroundColor: '#ffffff',
                    borderRadius: 10,
                  },
                }}
              />
              <Typography className='cm' sx={{ color: '#47B5FF', fontSize: '1.5rem' }}>
                cm
              </Typography>
            </div>
          </Grid>

          <Grid item>
            <Grid container direction='row-reverse' className='waterarea' item>
              <Grid item>
                <Box sx={{ height: '200px' }}>
                  <div>
                    <Box sx={{ height: '75px' }}></Box>
                  </div>
                  <div className='slider '>
                    <Slider
                      orientation='vertical'
                      aria-label='Always visible'
                      valueLabelFormat={() => {
                        return (
                          <div style={{ textAlign: 'center' }}>
                            {checked ? (
                              <p className='pulsatingDot' style={{ color: colour }}>
                                Water Level
                              </p>
                            ) : (
                              <p className='pulsatingDot' style={{ color: colour }}>
                                நீர் மட்டம்
                              </p>
                            )}
                          </div>
                        )
                      }}
                      min={0}
                      max={200}
                      value={depth}
                      valueLabelDisplay='on'
                      sx={{
                        '& .MuiSlider-thumb': {},
                        height: '200px',
                        padding: '0px',
                        color: colour,
                      }}
                      onChange={(e, depth) => {
                        e.preventDefault()
                        setDepth(depth as number)
                        if (depth > 100) {
                          setColor('#d00000')
                        } else if (depth > 55) {
                          setColor('#e85d04')
                        } else if (depth > 20) {
                          setColor('#47B5FF')
                        }
                      }}
                    />
                  </div>
                </Box>
              </Grid>

              <Grid item className='sliderImage'>
                <Box width='300px'>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='sliderTab'>
                      <TabList onChange={handleChange} centered>
                        <Tab label={checked ? 'Car' : 'கார்'} value='1' />
                        <Tab label={checked ? 'Bike' : 'பைக்'} value='2' />
                        <Tab label={checked ? 'Cycle' : 'மிதிவண்டி'} value='3' />
                      </TabList>
                    </Box>
                    <TabPanel value='1'>
                      <Box className='car' sx={{ height: '200px', width: '300px' }}>
                        <div>
                          <Box sx={{ height: 200 - depth, width: '300px' }}></Box>
                        </div>
                        <div className='water'>
                          <Box
                            sx={{
                              height: depth,
                              width: '300px',
                              maxHeight: '200px',
                            }}
                          ></Box>
                        </div>
                      </Box>
                    </TabPanel>{' '}
                    <TabPanel value='2'>
                      <Box className='bike' sx={{ height: '200px', width: '300px' }}>
                        <div>
                          <Box sx={{ height: 200 - depth, width: '300px' }}></Box>
                        </div>
                        <div className='water'>
                          <Box
                            sx={{
                              height: depth,
                              width: '300px',
                              maxHeight: '200px',
                            }}
                          ></Box>
                        </div>
                      </Box>
                    </TabPanel>{' '}
                    <TabPanel value='3'>
                      <Box className='cycle' sx={{ height: '200px', width: '300px' }}>
                        <div>
                          <Box sx={{ height: 200 - depth, width: '300px' }}></Box>
                        </div>
                        <div className='water'>
                          <Box
                            sx={{
                              height: depth,
                              width: '300px',
                              maxHeight: '200px',
                            }}
                          ></Box>
                        </div>
                      </Box>
                    </TabPanel>
                  </TabContext>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          direction='row'
          className='button'
          spacing='20'
          sx={{ paddingTop: '20px' }}
          item
        >
          <Grid item>
            <div className='upload '>
              <Button
                variant='contained'
                component='label'
                color='primary'
                sx={{ fontSize: 15, height: 40 }}
              >
                <AddAPhoto fontSize='medium' />{' '}
                {checked ? <div>Upload</div> : <div>பதிவேற்றுக</div>}
                <input
                  type='file'
                  accept='image/*'
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onChange={(e: { target: { files: any } }) => {
                    handleImageUpload(e.target.files[0])
                  }}
                  required
                  name='image'
                  hidden
                />
              </Button>
            </div>
          </Grid>
          <Grid item>
            <div className='submit '>
              <Button
                variant='contained'
                color='primary'
                onClick={handleSubmit}
                sx={{ fontSize: 15, height: 40, width: 120 }}
              >
                {checked ? <div>Submit</div> : <div>சமர்ப்பிதஂதிடு</div>}
              </Button>
            </div>
          </Grid>
        </Grid>

        <div>
          {imageURL && (
            <div className='image'>
              <img src={imageURL} alt='image' width={'75px'} height={'75px'} />
            </div>
          )}
        </div>
        <Modal_ open={open} setOpen={setOpen} text={text} />
      </ThemeProvider>
    </div>
  )
}
export default DataSubmission
