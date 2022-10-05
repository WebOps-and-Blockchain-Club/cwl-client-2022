import Example from '../../components/Accordion'
import DataSubmission from '../../components/DataSubmission'
import MapIcon from '@mui/icons-material/Map'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import WavesIcon from '@mui/icons-material/Waves'
import { Link } from 'wouter'
import { Fab } from '@mui/material'
import { NotListedLocationRounded, QuestionMarkRounded } from '@mui/icons-material'
import { useState } from 'react'
import Modal_ from '../../components/Modal'
const FrontPage = () => {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState({
    heading: 'Chennai WaterLogging Platform',
    body: 'Water level data is collected for use by Greater Chennai Corporation. ',
  })
  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <DataSubmission />
      <div className='logos'>
        <div className='logo'>
          <div className='logo1'>
            <img src={require('../../images/mapIcon.png')} width='60px' alt='CFI-logo' />{' '}
          </div>
          <div className='tag'>View Map</div>
        </div>
        <div className='logo'>
          <div className='logo2'>
            <Link to='/complaint'>
              <img src={require('../../images/reportIcon.png')} width='60px' alt='CFI-logo' />
            </Link>
          </div>
          <div className='tag'>Report Issue</div>
        </div>
        <div className='logo'>
          <div className='logo3'>
            <Link to='/volunteer/register'>
              <img src={require('../../images/volunteerIcon.png')} width='60px' alt='CFI-logo' />
            </Link>
          </div>
          <div className='tag'>Volunteer Registration</div>
        </div>
      </div>
      <div>
        <div className='container'>
          {/* <div className="container-pic"></div> */}
          <div className='container-info'>
            <Example />
          </div>
        </div>

        <div className='footer'>
          <div className='row'>
            <div className='column'></div>
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
            <p className='sec-row'>CFI 2022 © All Rights Reserved</p>
            <p className='sec-row'>DESIGNED BY WEBOPS & BLOCKCHAIN CLUB | CENTER FOR INOVATION</p>
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
