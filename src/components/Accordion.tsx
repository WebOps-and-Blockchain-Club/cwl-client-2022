import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useContext } from 'react'
import Language from '../utils/lang'

export default function SimpleAccordion() {
  const { checked } = useContext(Language)
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          {checked ? (
            <Typography className='question'>Who we are ?</Typography>
          ) : (
            <Typography className='question'>நாங்கள் யார் ?</Typography>
          )}
        </AccordionSummary>
        <AccordionDetails>
          {checked ? (
            <Typography variant='h6' className='answers'>
              This platform enables users / public to report details such as flood location and
              water depth, as well as add photos of flood sites with a description across the
              Chennai region as frequently as possible. All reports are gathered onto a real-time
              flood map. The data gathered through this platform aims to improve disaster
              preparedness and response in communities by gathering, sorting, and presenting data of
              flooding reports.
            </Typography>
          ) : (
            <Typography variant='h6' className='answers'>
              வெள்ளத்தின் இருப்பிடம் மற்றும் நீரின் ஆழம் போன்ற விவரங்களைப் பயனர்கள்/பொதுமக்கள்
              தெரிவிக்க இந்த தளம் உதவுகிறது, மேலும் சென்னை மண்டலம் முழுவதும் வெள்ளம் ஏற்பட்ட
              இடங்களின் புகைப்படங்களை விவரத்துடன் சேர்க்க உதவுகிறது.
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          {checked ? (
            <Typography className='question'>What we do ?</Typography>
          ) : (
            <Typography className='question'>நாம் என்ன செய்கிறோம் ?</Typography>
          )}
        </AccordionSummary>
        <AccordionDetails>
          {checked ? (
            <Typography variant='h6' className='answers'>
              This Crowd source data, curated through this platform will help to understand the
              reasons for waterlogging / inundation and help IIT Madras researchers to develop /
              design remedial measures that may be recommended to GCC, PWD and other relevant Govt.
              departments for their action.
            </Typography>
          ) : (
            <Typography variant='h6' className='answers'>
              இந்தத் தளத்தின் மூலம் சேகரிக்கப்பட்ட இந்த தகவல்கள், நீர் தேங்குதல்/ வெள்ளம்
              ஆகியவற்றுக்கான காரணங்களைப் புரிந்துகொள்ளவும், GCC, PWD மற்றும் பிற
              தொடர்புடையவற்றுக்குப் பரிந்துரைத்து தீர்வு நடவடிக்கைகளை உருவாக்க/வடிவமைக்க உதவுகிறது
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
