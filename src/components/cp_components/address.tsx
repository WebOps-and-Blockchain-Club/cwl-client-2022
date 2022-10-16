import { TextField, Button, createTheme, ThemeProvider } from '@mui/material'
import { lightBlue } from '@mui/material/colors'
import '../../styles/ComplaintPortal/cp_style.css'
const themes = createTheme({
  palette: {
    primary: {
      main: lightBlue[700],
    },
  },
})

const Address = ({
  area,
  locality,
  address,
  handleAreaChange,
  handleLocalityChange,
  handleAddressChange,
  activeStep,
  setActiveStep,
}: {
  area: any // eslint-disable-line
  locality: any // eslint-disable-line
  address: any // eslint-disable-line
  handleAreaChange: any // eslint-disable-line
  handleLocalityChange: any // eslint-disable-line
  handleAddressChange: any // eslint-disable-line

  activeStep: any // eslint-disable-line
  setActiveStep: any // eslint-disable-line
}) => {
  const handlePrev = () => {
    setActiveStep(activeStep - 1)
  }
  const handleNext = () => {
    if (area.trim().length !== 0) {
      if (locality.trim().length !== 0) {
        setActiveStep(activeStep + 1)
      }
    }
  }

  return (
    <div className='page'>
      <ThemeProvider theme={themes}>
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
            type='text'
            error={area.trim().length === 0}
            helperText={area.trim().length === 0 ? 'Please enter a valid area' : ''}
            required
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
            onChange={(e) => handleLocalityChange(e)}
            error={locality.trim().length === 0}
            helperText={locality.trim().length === 0 ? 'Please enter a valid locality' : ''}
            required
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
            onChange={(e) => handleAddressChange(e)}
          />
        </div>
        <div className='navButtons'>
          <Button
            disabled={activeStep === 0}
            onClick={handlePrev}
            className='prevBtn'
            color='primary'
            fullWidth
            sx={{ height: 45 }}
          >
            Back
          </Button>
          <Button
            color='primary'
            className='navigation'
            variant='contained'
            onClick={handleNext}
            fullWidth
            sx={{ height: 45 }}
            disabled={locality.trim().length == 0 || area.trim().length == 0 ? true : false}
          >
            Next
          </Button>
        </div>
      </ThemeProvider>
    </div>
  )
}

export default Address
