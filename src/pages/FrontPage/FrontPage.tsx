import Info from '../../components/Info'
import DataSubmission from '../../components/DataSubmission'
import Language from '../../utils/lang'
import { useContext, useState } from 'react'
import { Fab } from '@mui/material'
import { QuestionMarkRounded } from '@mui/icons-material'
import Modal_ from '../../components/Modal'

const FrontPage = () => {
  const [open, setOpen] = useState(false)
  const [text] = useState({
    heading: 'Chennai WaterLogging Platform',
    body: 'Water level data is collected for use by Greater Chennai Corporation. ',
  })
  const handleOpen = () => {
    setOpen(true)
  }

  const { checked } = useContext(Language)
  return (
    <>
      <DataSubmission />
      {/* <div className='logos'>
        <div className='logo'>
          <div className='logo1'>
            <img src={require('../../images/mapIcon.png')} width='60px' alt='CFI-logo' />{' '}
          </div>
          {checked ? <div className='tag'>View Map</div> : <div className='tag'>வரைபடம்</div>}
        </div>
        <div className='logo'>
          <div className='logo2'>
            <Link to='/complaint'>
              <img src={require('../../images/reportIcon.png')} width='60px' alt='CFI-logo' />
            </Link>
          </div>
          {checked ? (
            <div className='tag'>Report Issue</div>
          ) : (
            <div className='tag'>புகார் தளம்</div>
          )}
        </div>
        <div className='logo'>
          <div className='logo3'>
            <Link to='/volunteer/register'>
              <img src={require('../../images/volunteerIcon.png')} width='60px' alt='CFI-logo' />
            </Link>
          </div>
          {checked ? (
            <div className='tag'>Volunteer Registration</div>
          ) : (
            <div className='tag'>தன்னார்வ பதிவு</div>
          )}
        </div>
      </div> */}
      <div>
        <div className='container'>
          <div className='container-info'>
            <Info />
          </div>
        </div>
        <div className='footer'>
          <div className='row'>
            <div className='column'>
              <div className='footer-info'>
                {checked ? (
                  <h3>You must be the change you wish to see in the world</h3>
                ) : (
                  <h3>உலகில் நீங்கள் காண விரும்பும் மாற்றமாக நீங்கள் இருக்க வேண்டும்</h3>
                )}
              </div>
            </div>
          </div>
          <div
            className='row'
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'centre',
                alignItems: 'center',
              }}
            >
              <img
                src={require('../../images/CFI Logo (with text) - Black.png')}
                width='60px'
                alt='CFI-logo'
              />
              <img
                src={require('../../images/WebopsandBlockchainLogo.png')}
                width='60px'
                alt='CFI-logo'
              />
            </div>
          </div>
          <div className='row'>
            {checked ? (
              <p className='sec-row'>CFI 2022 © All Rights Reserved</p>
            ) : (
              <p className='sec-row'>CFI 2022 © அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை</p>
            )}
            {checked ? (
              <p className='sec-row'>DESIGNED BY WEBOPS & BLOCKCHAIN CLUB | CENTER FOR INOVATION</p>
            ) : (
              <p className='sec-row'>
                வெப் ஆபரேஷன்ஸ் & பிளாக்செயின் கிளப் மூலம் வடிவமைக்கப்பட்டது | புதுமைக்கான மையம்
              </p>
            )}
          </div>
          <div className='help'>
            <Fab color='primary' size='large' onClick={handleOpen}>
              <QuestionMarkRounded />
            </Fab>
            <Modal_ open={open} setOpen={setOpen} text={text} />
          </div>
        </div>
      </div>
    </>
  )
}

export default FrontPage
