import { useContext, useState } from 'react'
import { Fab } from '@mui/material'
import { QuestionMarkRounded } from '@mui/icons-material'
import Modal_ from '../../components/General/Modal'
import DataSubmission from '../../components/HomePage/DataSubmission'
import Info from '../../components/HomePage/Info'
import Language from '../../utils/lang'
const FrontPage = () => {
  const [open, setOpen] = useState(false)
  const [textEn] = useState({
    heading: 'Chennai WaterLogging Platform',
    body: 'This website allows users to submit the water logging level in their area. The entered water level is updated on the map with the image that the user uploads as a reference. Users will also be able to have knowledge about the water logging level of Chennai city on the map..',
  })
  const [textTam] = useState({
    heading: 'சென்னை மழைநீர் தேக்கப் பதிவுத் தளம்',
    body: 'இந்தத் தளம், உங்கள் பகுதியில் மழைநீர் தேக்க நிலையைச் சமர்ப்பிக்க பயனரை அனுமதிக்கிறது. உள்ளிடப்பட்ட மழைநீர் நிலை வரைபடத்தில் பயனர் பதிவேற்றும் புகைப்படத்துடன் புதுப்பிக்கப்படுகிறது. சென்னை மாநகரின் மழைநீர் தேக்க நிலை குறித்த விவரங்களையும் பயனர்கள் வரைபடத்தில் அறிந்து கொள்ளலாம்.',
  })
  const handleOpen = () => {
    setOpen(true)
  }
  const { checked } = useContext(Language)
  return (
    <>
      <DataSubmission />
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
              ---
              <a href='https://www.iitm.ac.in/'>
                <img
                  src={require('../../images/IIT_Madras_Logo.png')}
                  width='50px'
                  alt='IITM-logo'
                />
              </a>
              ---
              <a href='https://cfi.iitm.ac.in/'>
                <img
                  src={require('../../images/CFI Logo (with text) - Black.png')}
                  width='65px'
                  alt='CFI-logo'
                />
              </a>
              ---
              <a href='https://cfi.iitm.ac.in/clubs/webops-and-blockchain-club'>
                <img
                  src={require('../../images/WebopsandBlockchainLogo.png')}
                  width='45px'
                  alt='W&B-logo'
                />
              </a>
              ---
            </div>
          </div>
          <div className='row'>
            {checked ? (
              <p className='sec-row'>CFI 2022 © All Rights Reserved</p>
            ) : (
              <p className='sec-row'>CFI 2022 © அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை</p>
            )}
            {checked ? (
              <p className='sec-row'>WebOps and Blockchain Club, CFI, IIT Madras</p>
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
            {checked ? (
              <Modal_ open={open} setOpen={setOpen} text={textEn} />
            ) : (
              <Modal_ open={open} setOpen={setOpen} text={textTam} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default FrontPage
