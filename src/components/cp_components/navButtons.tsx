import { TextField, Button } from '@mui/material'
import '../../styles/ComplaintPortal/cp_style.css'

const NavButtons = ({
  activeStep,
  setActiveStep,
  handleSubmit,
}: {
  activeStep: any
  setActiveStep: any
  handleSubmit: any
}) => {
  const tabs = ['PersonDetail', 'Address', 'ComplaintType', 'ComplaintDetails']

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }
  const handlePrev = () => {
    setActiveStep(activeStep - 1)
  }

  return (
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
      {activeStep < tabs.length - 1 ? (
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
      ) : (
        <Button
          type='submit'
          color='primary'
          className='navigation'
          variant='contained'
          onSubmit={handleSubmit}
          fullWidth
          sx={{ height: 45 }}
        >
          Submit
        </Button>
      )}
    </div>
  )
}
export default NavButtons
