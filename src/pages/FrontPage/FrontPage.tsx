import Example from '../../components/Accordion';
import CarouselComponent from '../../components/Carousel';
import MapIcon from '@mui/icons-material/Map';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import WavesIcon from '@mui/icons-material/Waves';
import NewspaperIcon from '@mui/icons-material/Newspaper';
const FrontPage = () => {

    return (
        <>
            <CarouselComponent />
            <div className='logos'>
                <div className='logo'><div className='logo1'><MapIcon /></div><div className='tag'>Map Feature</div></div>
                <div className='logo'><div className='logo2'><FormatAlignCenterIcon /></div><div className='tag'>Complaint Portal</div></div>
                <div className='logo'><div className='logo3'><WavesIcon /></div><div className='tag'>WaterLevel Submission</div></div>
                <div className='logo'><div className='logo4'><NewspaperIcon /></div><div className='tag'>Volunteer Dashboard</div></div>

            </div>
            <div>
                <div className="container">
                    {/* <div className="container-pic"></div> */}
                    <div className="container-info"><Example /></div>
                </div>

                <div className="footer">
                    <div className="row">
                        <div className="column">
                            <div className="footer-info">
                                <h3>You must be the change you wish to see in the world</h3>
                                <p>Get In touch with us using any of the platforms</p>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <p className="sec-row">CFI 2022 © All Rights Reserved</p>
                        <p className="sec-row">DESIGNED BY WEB OPERATIONS & BLOCKCHAIN | CENTER FOR INOVATION</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FrontPage