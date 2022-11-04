import { TextField, Button } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'
import '../../styles/Complaint.css'

const ComplaintDetails = ({
  complaint,
  complaintDetails,
  handleComplaintChange,
  handleComplaintDetailsChange,
  imageURL,
  handleImageUpload,
  activeStep,
  setActiveStep,
  handleSubmit,
}: {
  complaint: any // eslint-disable-line
  complaintDetails: any // eslint-disable-line
  handleComplaintChange: any // eslint-disable-line
  handleComplaintDetailsChange: any // eslint-disable-line
  imageURL: any // eslint-disable-line
  handleImageUpload: any // eslint-disable-line
  activeStep: any // eslint-disable-line

  setActiveStep: any // eslint-disable-line
  handleSubmit: any // eslint-disable-line
}) => {
  const handlePrev = () => {
    setActiveStep(activeStep - 1)
  }

  // eslint-disable-next-line
  const handleFormSubmit = (e: any) => {
    if (complaint.trim().length !== 0) {
      handleSubmit()
    }
  }

  return (
    <div className='page'>
      <div className='text'>
        <TextField
          name='complaint'
          id='complaint'
          value={complaint}
          fullWidth
          margin='normal'
          label='Complaint'
          variant='outlined'
          onChange={(e) => handleComplaintChange(e)}
          error={complaint.trim().length === 0}
          helperText={complaint.trim().length === 0 ? 'Please enter a complaint' : ''}
          required
        />
      </div>
      <div className='text'>
        <TextField
          multiline
          name='complaintDetails'
          id='complaintDetails'
          value={complaintDetails}
          fullWidth
          margin='normal'
          label='Complaint Details (max 400 words)'
          variant='outlined'
          onChange={(e) => handleComplaintDetailsChange(e)}
        />
      </div>
      <div className='upload button'>
        <Button variant='contained' component='label' color='primary' sx={{ fontSize: 17 }}>
          <PhotoCamera fontSize='large' /> upload
          <input
            type='file'
            accept='image/*'
            onChange={(e) => handleImageUpload(e)}
            name='image'
            hidden
          />
        </Button>
        {imageURL && (
          <div className='image'>
            <img src={imageURL} alt='image' width={'auto'} height={'100px'} />
          </div>
        )}
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
          type='submit'
          color='primary'
          className='navigation'
          variant='contained'
          onClick={(e) => {
            handleFormSubmit(e)
          }}
          fullWidth
          sx={{ height: 45 }}
          disabled={complaint.trim().length === 0 ? true : false}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default ComplaintDetails
