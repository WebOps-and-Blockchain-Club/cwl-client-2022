import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function SimpleAccordion() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography className='question'>Who we are ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='h6' className='answers'>
            This platform enables users / public to report details such as flood location and water
            depth, as well as add photos of flood sites with a description across the Chennai region
            as frequently as possible. All reports are gathered onto a real-time flood map. The data
            gathered through this platform aims to improve disaster preparedness and response in
            communities by gathering, sorting, and presenting data of flooding reports.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography className='question'>What we do ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='h6' className='answers'>
            This Crowd source data, curated through this platform will help to understand the
            reasons for waterlogging / inundation and help IIT Madras researchers to develop /
            design remedial measures that may be recommended to GCC, PWD and other relevant Govt.
            departments for their action.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
