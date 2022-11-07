import React from 'react'
import { Modal, Box, Typography } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

function WhatsAppModal(props: {
  props: {
    showWhatsAppInstructionsModal: boolean
    setShowWhatsAppInstructionsModal: React.Dispatch<React.SetStateAction<boolean>>
  }
}) {
  const { showWhatsAppInstructionsModal, setShowWhatsAppInstructionsModal } = props.props
  return (
    <div>
      <Modal
        open={showWhatsAppInstructionsModal}
        onClose={(e: { preventDefault: () => void }) => {
          e.preventDefault()
          setShowWhatsAppInstructionsModal(false)
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <ul>
            <li>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Send a message &quot;join young-route&quot; to
                <a href='https://wa.me/+1(415)5238886?text=join%20young-route'>+1 (415) 523 8886</a>
              </Typography>
            </li>
            <li>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Click a picture using WhatsApp (optional)
              </Typography>
            </li>
            <li>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Add a message to the clicked picture or send a regular message like so
              </Typography>
            </li>
            <li>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Water Level (in cm); Address
              </Typography>
            </li>
            <li>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Example: &quot;20; IIT Madras Main Gate&quot;
              </Typography>
            </li>
          </ul>
        </Box>
      </Modal>
    </div>
  )
}

export default WhatsAppModal
