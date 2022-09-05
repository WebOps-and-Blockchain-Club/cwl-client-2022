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

  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const tabs = ['PersonDetail', 'Address', 'ComplaintType', 'ComplaintDetails']

  const pageDisplay = () => {
    switch (activeStep) {
      case 0:
        return <PersonDetails />
      case 1:
        return <Address />
      case 2:
        return <ComplaintType />
      case 3:
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
        <Button
          disabled={activeStep === 0}
          onClick={handlePrev}
          className='prevBtn'
          color='success'
        >
          Back
        </Button>
        {activeStep < tabs.length - 1 ? (
          <Button color='success' className='navigation' variant='contained' onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button
            type='submit'
            color='success'
            className='navigation'
            variant='contained'
            onSubmit={handleSubmit}
          >
            Submit
          </Button>
        )}
      </div>
    </Paper>
  )
}

export default ComplaintPortal
