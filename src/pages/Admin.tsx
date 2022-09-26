import * as React from 'react'
import { Tabs, Tab, Typography, Box, Button } from '@mui/material'

import CompliantDashboard from '../components/Volunteer/ComplaintDashboard'
import VolunteerDashboard from '../components/Volunteer/VolunteerDashboard'
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const Admin = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        textAlign='right'
        style={{ paddingRight: '30px', paddingBottom: '20px', paddingTop: '20px' }}
      >
        <Button
          variant='contained'
          size='large'
          color='primary'
          onClick={() => {
            localStorage.removeItem('USER')
            window.location.reload()
          }}
        >
          Logout
        </Button>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example' centered>
          <Tab label='Volunteer' {...a11yProps(1)} />
          <Tab label='Compliant' {...a11yProps(0)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <VolunteerDashboard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CompliantDashboard />
      </TabPanel>
    </Box>
  )
}
export default Admin
