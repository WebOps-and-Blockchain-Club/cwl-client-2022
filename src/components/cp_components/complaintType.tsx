import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal } from 'react'
import { Grid, Button, Typography } from '@mui/material'
import '../../styles/ComplaintPortal/cp_style.css'

const ComplaintType = ({
  problem,
  complaints,
  handleComplaintTypeChange,
}: {
  problem: any
  complaints: any
  handleComplaintTypeChange: any
}) => {
  return (
    <Grid container alignItems='center' justifyContent='center'>
      <Grid item display='flex' xs={12} sm={10} md={10}>
        <Typography
          variant='h6'
          sx={{ marginTop: 1, marginBottom: 0.5, color: '#0073e6', fontWeight: '400' }}
        >
          Select your complaint type:
        </Typography>
      </Grid>
      {complaints.map(
        (complaint: {
          id: Key | null | undefined
          state: any
          name:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | ReactFragment
            | ReactPortal
            | null
            | undefined
        }) => (
          <Grid item key={complaint.id} display='flex'>
            <Button
              sx={{ width: 200, padding: 0.5, margin: 0.5, height: 40 }}
              key={complaint.id}
              onClick={() => handleComplaintTypeChange(complaint)}
              variant={complaint.state ? 'contained' : 'outlined'}
              color='primary'
            >
              {complaint.name}
            </Button>
          </Grid>
        ),
      )}
    </Grid>
  )
}

export default ComplaintType
