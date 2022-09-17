import { useState, useReducer, SetStateAction } from 'react'
import { Paper, Typography } from '@mui/material'
import '../../styles/ComplaintPortal/cp_style.css'
import PersonDetails from '../../components/cp_components/personDetails'
import Address from '../../components/cp_components/address'
import ComplaintDetails from '../../components/cp_components/complaintDetails'
import ComplaintType from '../../components/cp_components/complaintType'

const complaints = [
  { id: 1, name: 'General', state: false },
  { id: 2, name: 'Water Logging', state: false },
  { id: 3, name: 'Electricity', state: false },
  { id: 4, name: 'Street Light', state: false },
  { id: 5, name: 'Shelter', state: false },
  { id: 6, name: 'Road and Footpath', state: false },
  { id: 7, name: 'Food', state: false },
  { id: 8, name: 'Drains', state: false },
]

function problemReducer(state: any, complaint: any) {
  return [...state, complaint]
}

const ComplaintPortal = () => {
  const [activeStep, setActiveStep] = useState(0)
  // All data entriy states
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [area, setArea] = useState('your area')
  const [locality, setLocality] = useState('your locality')
  const [street, setStreet] = useState('your street')
  const [address, setAddress] = useState('')
  const [problem, setProblem] = useReducer(problemReducer, [complaints])
  const [complaint, setComplaint] = useState('')
  const [complaintDetails, setComplaintDetails] = useState('')
  const [, setFile] = useState('')
  const [imageURL, setImageURL] = useState('')

  // handelers for all data
  const handleNameChange = (e: { target: { value: SetStateAction<string> } }) => {
    setName(e.target.value)
  }
  const handlePhoneChange = (e: { target: { value: SetStateAction<string> } }) => {
    setPhone(e.target.value)
  }
  const handleOtpChange = (e: { target: { value: SetStateAction<string> } }) => {
    setOtp(e.target.value)
  }
  const handleAreaChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setArea(e.target.value)
  }
  const handleLocalityChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setLocality(e.target.value)
  }
  const handleStreetChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setStreet(e.target.value)
  }
  const handleAddressChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setAddress(e.target.value)
  }
  function handleComplaintTypeChange(complaint: { id?: number; name?: string; state: any }) {
    const state = !complaint.state
    setProblem((complaint.state = state))
  }
  const handleComplaintChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setComplaint(e.target.value)
  }
  const handleComplaintDetailsChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setComplaintDetails(e.target.value)
  }
  const handleImageUpload = (e: { target: { files: any } }) => {
    setFile(e.target.files[0])
    setImageURL(URL.createObjectURL(e.target.files[0]))
    console.log(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = () => {
    console.log('submitted')
  }

  const pageDisplay = () => {
    switch (activeStep) {
      case 0:
        return (
          <div>
            <Typography
              variant='h4'
              className='title'
              sx={{ marginTop: '1rem', justifyContent: 'center' }}
            >
              My Details
            </Typography>
            <PersonDetails
              name={name}
              phone={phone}
              otp={otp}
              handleNameChange={handleNameChange}
              handlePhoneChange={handlePhoneChange}
              handleOtpChange={handleOtpChange}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </div>
        )
      case 1:
        return (
          <div>
            <Typography
              variant='h4'
              className='title'
              sx={{ marginTop: '1rem', justifyContent: 'center' }}
            >
              My Address
            </Typography>
            <Address
              area={area}
              locality={locality}
              street={street}
              address={address}
              handleAreaChange={handleAreaChange}
              handleLocalityChange={handleLocalityChange}
              handleStreetChange={handleStreetChange}
              handleAddressChange={handleAddressChange}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </div>
        )
      case 2:
        return (
          <div>
            <Typography
              variant='h4'
              className='title'
              sx={{ marginTop: '1rem', justifyContent: 'center' }}
            >
              Complaint Type
            </Typography>
            <ComplaintType
              problem={problem}
              complaints={complaints}
              handleComplaintTypeChange={handleComplaintTypeChange}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </div>
        )
      case 3:
        return (
          <div>
            <Typography
              variant='h4'
              className='title'
              sx={{ marginTop: '1rem', justifyContent: 'center' }}
            >
              Complaint Details
            </Typography>
            <ComplaintDetails
              complaint={complaint}
              complaintDetails={complaintDetails}
              handleComplaintChange={handleComplaintChange}
              handleComplaintDetailsChange={handleComplaintDetailsChange}
              imageURL={imageURL}
              handleImageUpload={handleImageUpload}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              handleSubmit={handleSubmit}
            />
          </div>
        )
    }
  }
  const paperStyle = {
    padding: '5px 20px 50px',
    width: 500,
    margin: '3vh auto',
  }

  return (
    <div className='complaint-portal ' >
      <Typography
        variant='h3'
        sx={{ fontWeight: 'bold', justifyContent: 'center' }}
        className='heading'
      >
        Complaint Portal
      </Typography>{' '}
      <Paper elevation={1} className='content' style={paperStyle}>
        <div>{pageDisplay()}</div>
      </Paper>
    </div>
  )
}

export default ComplaintPortal
