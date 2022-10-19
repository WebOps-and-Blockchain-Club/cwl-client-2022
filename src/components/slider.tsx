import { TextField, Typography, Paper, Slider, Box, Grid } from '@mui/material'
import { useState } from 'react'
import '../../styles/DataSubmission/DataSubmission.css'

// const car = require('../../images/car-man.png')

const SliderFunction = () => {
  const [depth, setDepth] = useState(120)

  const paperStyle = {
    padding: ' 50px 50px 0px 50px',
    // width: 500,
    margin: '10vh 25vh 0vh 25vh ',
    backgroundColor: '#b3e5fc',
  }
  //   const getDepth = (depth: any) => {
  //     {
  //       depth
  //     }
  //   }

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
            // label='in feet'
            variant='outlined'
            onChange={(e) => setDepth(parseFloat(e.target.value))}
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
                <Box sx={{ height: depth * 1.5, width: '600px' }}></Box>
              </div>
            </Box>
          </Grid>
        </Grid>
        <Grid item className='link'>
          <p>Log this as a complaint</p>
        </Grid>
      </Paper>
    </div>
  )
}
export default SliderFunction
