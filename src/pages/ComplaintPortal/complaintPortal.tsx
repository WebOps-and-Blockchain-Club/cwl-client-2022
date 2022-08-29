import { useState } from 'react'
import { Button, Paper } from '@mui/material'
import '../../styles/cp_style.css'
import PersonDetails from '../../components/cp_components/personDetails'
import Address from '../../components/cp_components/address'
import ComplaintDetails from '../../components/cp_components/complaintDetails'
import ComplaintType from '../../components/cp_components/complaintType'

const ComplaintPortal = () => {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handlePrev = () => {
    setActiveStep(activeStep - 1)
  }

  const tabs = ['PersonDetail', 'Address', 'ComplaintType', 'ComplaintDetails']

  const pageDisplay = () => {
    if (activeStep === 0) {
      return <PersonDetails />
    } else if (activeStep === 1) {
      return <Address />
    } else if (activeStep === 2) {
      return <ComplaintType />
    } else if (activeStep === 3) {
      return <ComplaintDetails />
    }
  }

  return (
    <Paper
      elevation={10}
      className='content'
      sx={{ margin: 2, verticalAlign: 'middle', maxWidth: 500 }}
    >
      <div>{pageDisplay()}</div>
      <div className='navButtons'>
        <Button disabled={activeStep === 0} onClick={handlePrev} className='prevBtn'>
          Back
        </Button>
        {activeStep < tabs.length - 1 ? (
          <Button color='primary' className='navigation' variant='contained' onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button type='submit' color='primary' className='navigation' variant='contained'>
            Submit
          </Button>
        )}
      </div>
    </Paper>
  )
}

export default ComplaintPortal
