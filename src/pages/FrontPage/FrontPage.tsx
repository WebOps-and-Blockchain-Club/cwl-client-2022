import Example from '../../components/Accordion'
import DataSubmission from '../../components/DataSubmission'
import MapIcon from '@mui/icons-material/Map'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import WavesIcon from '@mui/icons-material/Waves'
import { Link } from 'wouter'
const FrontPage = () => {
  return (
    <>
      <DataSubmission />
      <div className='logos'>
        <div className='logo'>
          <div className='logo1'>
            <MapIcon />
          </div>
          <div className='tag'>Map View</div>
        </div>
        <div className='logo'>
          <div className='logo2'>
            <Link to='/complaint'>
              <FormatAlignCenterIcon />
            </Link>
          </div>
          <div className='tag'>Complaint Portal</div>
        </div>
        <div className='logo'>
          <div className='logo3'>
            <Link to='/volunteer/register'>
              <WavesIcon />
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
            <div className='column'>
              <div className='footer-info'>
                <h3>You must be the change you wish to see in the world</h3>
                <p>Get In touch with us using any of the platforms</p>
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
            <p className='sec-row'>CFI 2022 © All Rights Reserved</p>
            <p className='sec-row'>
              DESIGNED BY WEB OPERATIONS & BLOCKCHAIN | CENTER FOR INOVATION
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default FrontPage
