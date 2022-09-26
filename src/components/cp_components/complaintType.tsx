import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useState,
} from 'react'
import { Grid, Button, Typography } from '@mui/material'
import '../../styles/ComplaintPortal/cp_style.css'

const ComplaintType = ({
  complaints,
  handleComplaintTypeChange,
  activeStep,
  setActiveStep,
}: {
  problem: any // eslint-disable-line
  complaints: any // eslint-disable-line
  handleComplaintTypeChange: any // eslint-disable-line
  activeStep: any // eslint-disable-line
  setActiveStep: any // eslint-disable-line
}) => {
  const [, setComplaintErr] = useState(true)
  const handlePrev = () => {
    setActiveStep(activeStep - 1)
  }
  const handleNext = () => {
    // eslint-disable-next-line
    complaints.forEach((complaint: any) => {
      if (complaint.state === true) {
        setComplaintErr(false)
      }
    })
    setActiveStep(activeStep + 1)
  }

  return (
    <div>
      <Grid container alignItems='center' justifyContent='center'>
        <Grid item display='flex' xs={12} sm={10} md={10}>
          <Typography
            variant='h6'
            sx={{ marginTop: 1, marginBottom: 0.5, color: '#0073e6', fontWeight: '400' }}
          >
            Select your complaint type:
          </Typography>
        </Grid>
        {complaints.map(
          (complaint: {
            id: Key | null | undefined
            state: any // eslint-disable-line
            name:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>> // eslint-disable-line
              | ReactFragment
              | ReactPortal
              | null
              | undefined
          }) => (
            <Grid item key={complaint.id} display='flex'>
              <Button
                sx={{ width: 200, padding: 0.5, margin: 0.5, height: 40 }}
                key={complaint.id}
                onClick={() => handleComplaintTypeChange(complaint)}
                variant={complaint.state ? 'contained' : 'outlined'}
                color='primary'
              >
                {complaint.name}
              </Button>
            </Grid>
          ),
        )}
      </Grid>
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
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default ComplaintType
