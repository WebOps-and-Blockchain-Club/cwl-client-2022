import Example from '../../components/Accordion'
import DataSubmission from '../../components/DataSubmission'
import MapIcon from '@mui/icons-material/Map'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import WavesIcon from '@mui/icons-material/Waves'
import { Link } from 'wouter'
import Language from '../../utils/lang'
import { useContext } from 'react'
const FrontPage = () => {
  const { checked, setChecked } = useContext(Language)
  return (
    <>
      <DataSubmission />
      <div className='logos'>
        <div className='logo'>
          <div className='logo1'>
            <MapIcon />
          </div>
          {checked ? <div className='tag'>Map View</div> : <div className='tag'>வரைபடம்</div>}
        </div>
        <div className='logo'>
          <div className='logo2'>
            <Link to='/complaint'>
              <FormatAlignCenterIcon />
            </Link>
          </div>
          {checked ? (
            <div className='tag'>Complaint Portal</div>
          ) : (
            <div className='tag'>புகார் தளம்</div>
          )}
        </div>
        <div className='logo'>
          <div className='logo3'>
            <Link to='/volunteer/register'>
              <WavesIcon />
            </Link>
          </div>
          {checked ? (
            <div className='tag'>Volunteer Registration</div>
          ) : (
            <div className='tag'>தன்னார்வ பதிவு</div>
          )}
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
            <div className='column'>
              <div className='footer-info'>
                {checked ? (
                  <h3>You must be the change you wish to see in the world</h3>
                ) : (
                  <h3>
                  உலகில் நீங்கள் காண விரும்பும் மாற்றமாக நீங்கள் இருக்க வேண்டும்</h3>
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
            {checked?<p className='sec-row'>CFI 2022 © All Rights Reserved</p>:<p className='sec-row'>CFI 2022 © அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை</p>}
            {checked?<p className='sec-row'>
              DESIGNED BY WEB OPERATIONS & BLOCKCHAIN | CENTER FOR INOVATION
            </p>:<p className='sec-row'>
            வெப் ஆபரேஷன்ஸ் & பிளாக்செயின் கிளப் மூலம் வடிவமைக்கப்பட்டது | புதுமைக்கான மையம்
            </p>}
          </div>
        </div>
      </div>
    </>
  )
}

export default FrontPage
