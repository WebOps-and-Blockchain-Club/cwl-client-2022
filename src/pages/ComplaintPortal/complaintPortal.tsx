import { useState } from 'react'
import { Button, Paper, Typography } from '@mui/material'
import '../../styles/cp_style.css'
import PersonDetails from '../../components/cp_components/personDetails'
import Address from '../../components/cp_components/address'
import ComplaintDetails from '../../components/cp_components/complaintDetails'
import ComplaintType from '../../components/cp_components/complaintType'

const ComplaintPortal = () => {
  const [activeStep, setActiveStep] = useState(0)
  // const [name, setName] = useState({ name: '' })
  // const [phone, setPhone] = useState({ phone: '', state: 'false' })
  // const [otp, setOtp] = useState({ otp: '', state: 'false' })

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    otp: '',
  })

  const handleInputData = (input) => (e) => {
    const { value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [input]: value,
    }))
  }
  // const handleNameChange = (e) => {
  //   setName(e.target.value)
  // }
  // const handlePhoneChange = (e) => {
  //   setPhone(e.target.value)
  // }
  // const handleOtpChange = (e) => {
  //   setOtp(e.target.value)
  // }

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
        return (
          <div>
            <Typography variant='h5' className='title'>
              My Details
            </Typography>
            <PersonDetails values={formData} handleFormData={handleInputData} />
          </div>
        )
      case 1:
        return (
          <div>
            <Typography variant='h5' className='title'>
              My Address
            </Typography>
            <Address />
          </div>
        )
      case 2:
        return (
          <div>
            <Typography variant='h5' className='title'>
              Complaint Type
            </Typography>
            <ComplaintType />
          </div>
        )
      case 3:
        return (
          <div>
            <Typography variant='h4' className='title'>
              Complaint Details
            </Typography>
            <ComplaintDetails />
          </div>
        )
    }
  }
  const paperStyle = { padding: '50px' }

  return (
    <Paper elevation={10} className='content' style={paperStyle}>
      <Typography variant='h4' className='heading'>
        {' '}
        Complaint Portal
      </Typography>
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
