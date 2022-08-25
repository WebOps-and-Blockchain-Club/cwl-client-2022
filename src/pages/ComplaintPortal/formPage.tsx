import React, { useState } from 'react'
import {Button} from '@mui/material'
import '../../styles/cp_style.css'
import PersonDetails from '../../components/cp_components/personDetails'

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
      return <PersonDetails/>
    } else if (activeStep === 1) {
      return <h2>address</h2>
    } else if (activeStep === 2) {
      return <h2>complaintType</h2>
    } else if (activeStep === 3) {
      return <h2>complaintDetails</h2>
    }
  }

  return (
    <div className='formPage'>
      <h1>{pageDisplay()}</h1>
      <Button
        disabled={activeStep === 0}
        onClick={handlePrev}
        // variant='contained'
        className='prevBtn'
      >
        Back
      </Button>
      {activeStep < tabs.length - 1 ? 
      <Button
        color='primary'
        className='navigation'
        variant='contained'
        onClick={handleNext}
      >
        Next
      </Button> :
      <Button
      type='submit'
      color='primary'
      className='navigation'
      variant='contained'
    //   disabled={formSubmitted}
    >
      Submit
    </Button> }
    </div>
  )
}

export default ComplaintPortal
