import { useState, SetStateAction, useEffect, useContext } from 'react'
import { Paper, Typography } from '@mui/material'
import '../../styles/ComplaintPortal/cp_style.css'
import PersonDetails from '../../components/cp_components/personDetails'
import Address from '../../components/cp_components/address'
import ComplaintDetails from '../../components/cp_components/complaintDetails'
import ComplaintType from '../../components/cp_components/complaintType'
import { useMutation, useQuery } from '@apollo/client'
import { PostIssueDocument, GetS3UrlDocument } from '../../generated'
import { useLocation } from 'wouter'
import Data from '../../utils/Context'
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

const ComplaintPortal = () => {
  const [activeStep, setActiveStep] = useState(0)
  const { data: dataS3 } = useQuery(GetS3UrlDocument)
  // All data entriy states
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [area, setArea] = useState('')
  const [locality, setLocality] = useState('')
  const [address, setAddress] = useState('')
  const [problem, setProblem] = useState(complaints)
  const [complaint, setComplaint] = useState('')
  const [complaintDetails, setComplaintDetails] = useState('')
  const [imageURL, setImageURL] = useState('')
  const { coord } = useContext(Data)
  const [tags, setTags] = useState('')
  const [, setLocation] = useLocation()
  useEffect(() => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${coord.lng},${coord.lat}.json?access_token=${process.env.REACT_APP_MAPBOX_SECRET_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setArea(data.features[3].place_name)
        setLocality(data.features[1].place_name.split(',')[0])
        setAddress(data.features[0].place_name)
      })
      .catch((e) => console.log(e))
  }, [])
  const [postIssue] = useMutation(PostIssueDocument, {
    variables: {
      complaintInput: {
        tags,
        phoneNumber: phone,
        location: JSON.stringify(coord),
        username: name,
        desc: complaint,
        status,
        image: imageURL,
      },
    },
  })

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
  const handleAddressChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setAddress(e.target.value)
  }
  function handleComplaintTypeChange(complaint: { id?: number; name?: string; state: boolean }) {
    const newProblem = problem.map((cop) => {
      if (cop.id === complaint.id) {
        cop.state = !cop.state
      }
      return cop
    })
    setProblem(newProblem)
  }
  const handleComplaintChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setComplaint(e.target.value)
  }
  const handleComplaintDetailsChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setComplaintDetails(e.target.value)
  }
  // eslint-disable-next-line
  const handleImageUpload = async (e: { target: { files: any } }) => {
    const s3URL = dataS3?.getS3URL
    await fetch(s3URL || '', {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: e.target.files[0],
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
      })
      .catch((e) => console.log(e))
    setImageURL((s3URL || '').split('?')[0])
  }

  const handleSubmit = async () => {
    let coordnew
    await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${JSON.stringify(
        address,
      )}.json?access_token=${process.env.REACT_APP_MAPBOX_SECRET_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => {
        let min = 100
        // eslint-disable-next-line
        data.features.map((e: { center: any[] }) => {
          const x = e.center[1] - coord.lat
          const y = e.center[0] - coord.lng
          if (Math.sqrt(x * x + y * y) < min) {
            min = Math.sqrt(x * x + y * y)
            coordnew = JSON.stringify({ lat: e.center[1], lng: e.center[0] })
          }
        })
      })
      .catch((e) => console.log(e))
    const problemTags = JSON.stringify(
      problem
        .filter((tag: { state: boolean }) => tag.state)
        .map((tag: { name: string }) => tag.name),
    )
    setTags(problemTags)
    try {
      await postIssue({
        variables: {
          complaintInput: {
            tags: problemTags,
            phoneNumber: phone,
            location: coordnew || ' ',
            username: name,
            desc: complaint,
            status,
            image: imageURL,
          },
        },
      })
      setLocation('/')
    } catch (error) {
      console.error(error)
    }
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
              address={address}
              handleAreaChange={handleAreaChange}
              handleLocalityChange={handleLocalityChange}
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
    <div className='complaint-portal '>
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
