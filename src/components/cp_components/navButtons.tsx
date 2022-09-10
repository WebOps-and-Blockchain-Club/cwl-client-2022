import { TextField, Button } from '@mui/material'
import '../../styles/ComplaintPortal/cp_style.css'
import { useFormik } from 'formik'

const NavButtons = ({
  activeStep,
  setActiveStep,
  handleSubmit,
  tabs,
  handlePrev,
  handleNext,
}: {
  activeStep: any
  setActiveStep: any
  handleSubmit: any
  tabs: any
  handlePrev: any
  handleNext: any
}) => {
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
