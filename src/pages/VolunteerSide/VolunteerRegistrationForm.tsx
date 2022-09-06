import { SetStateAction, useState } from 'react' // eslint-disable-line
// import { useNavigate } from "react-router-dom";
import Provision from '../../interfaces/VolunteerSide/Provision'
import Volunteer from '../../interfaces/VolunteerSide/Volunteer'
import DropDown from '../../components/DropDown'
import { makeStyles } from '@mui/styles'
// import {Paper} from '@mui/material'
// import { provisionOptions, ProvisionOption } from '../../utils/ProvisionData'
// import { MenuProps } from '../../utils/MenuProps'
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Link,
  Avatar,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Box,
  Container,
  Select,
  OutlinedInput,
  Chip,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import '../../styles/VolunteerRegistrationForm.css'
// import { getStyles } from '../../utils/GetStyles'
// const [location, setLocation] = useLocation()
const theme = createTheme()
const useStyles: any = makeStyles({
  main: {
    // background: '#90EE90',
    // border: 0,
    // borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // color: 'white',
    // height:  ,
    textAlign: 'center',
    margin: 'auto',
    padding: '0 100px',
    // alignItems: 'center',
  },
  content: {},
})
const paperStyles = {
  padding: '30px 60px',
  width: 600,
  margin: '60px auto',
  display: 'flex',
  borderRadius: '10px',
  // backgroundColor: '#e3f2fd',
}

function VolunteerRegistrationForm({
  volunteerList,
  err,
}: {
  volunteerList: Volunteer[] | null
  err: any // eslint-disable-line
}) {
  const [volunteerName, setVolunteerName]: [string, React.Dispatch<React.SetStateAction<string>>] =
    useState('')
  const [volunteerPhone, setVolunteerPhone]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ] = useState('')
  const [volunteerPassword, setVolunteerPassword]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ] = useState('')
  // eslint-disable-next-line
  const [volunteerProvisions, setVolunteerProvisions]: [
    Provision[],
    React.Dispatch<React.SetStateAction<never[]>>,
  ] = useState([])
  const [error, setError] = useState('')
  const classes = useStyles()
  // const theme = useTheme()
  // const navigate: any = useNavigate();
  // const volunteerList = useRef([]);
  if (err) setError(err)

  const handleSubmit = async (): Promise<void> => {
    if (!volunteerList) {
      return
    }
    try {
      const volunteer: Volunteer = {
        id: volunteerList.length + 1,
        name: volunteerName,
        phoneNumber: volunteerPhone,
        password: volunteerPassword,
        provisions: volunteerProvisions.map((option: Provision) => option.value),
      }

      volunteerList.forEach((e) => {
        if (e.id === volunteer.id) {
          throw Error('ID already exists')
        }
        if (e.phoneNumber === volunteer.phoneNumber) {
          throw Error('Phone number already registered')
        }
      })
      await fetch('http://localhost:5000/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(volunteer),
      })
      console.log('Data added')
      // eslint-disable-next-line
    } catch (error: any) {
      setError(error.message)
      console.error(error)
    }
  }

  return (
    // <div className='App'>
    //   <Paper>
    //   <Typography
    //     variant='h4'
    //     style={{ textAlign: 'center', paddingBottom: '35px', padding: '20px' }}
    //   >
    //     Volunteer Registration Form
    //   </Typography>
    // <Typography
    //   variant='h6'
    //   style={{ textAlign: 'center', padding: '5px', paddingBottom: '10px' }}
    // >
    //   Fill the form to be a part of the mission
    // </Typography>
    //   <div>
    // <Typography
    //   style={{
    //     color: 'purple',
    //     fontSize: 'medium',
    //     textAlign: 'right',
    //     paddingRight: '50px',
    //     textDecorationLine: 'underline',
    //   }}
    // >
    //   Already Registered?
    // </Typography>
    //   </div>
    //   <form
    //     action='post'
    //     onSubmit={(e) => {
    //       handleSubmit()
    //       // navigate("/something", { replace: true });
    //       e.preventDefault()
    //     }}
    //   >
    //     <div className={classes.main}>
    //       <div>
    // <TextField
    //   style={{ paddingBottom: '20px' }}
    //   id='volunteer-name'
    //   label='Name'
    //   variant='outlined'
    //   value={volunteerName}
    //   onChange={(e) => {
    //     setVolunteerName(e.target.value)
    //     e.preventDefault()
    //   }}
    //   error={
    //     volunteerName.length !== 0 && !/^[A-Z]?[a-z]*(\s[A-Z])?[a-z]*$/.test(volunteerName)
    //   }
    //   helperText={
    //     volunteerName.length !== 0 && !/^[A-Z]?[a-z]*(\s[A-Z])?[a-z]*$/.test(volunteerName)
    //       ? 'Please enter a valid name'
    //       : ''
    //   }
    //   required
    //   color='success'
    // />
    //       </div>
    //       <div>
    // <TextField
    //   style={{ paddingBottom: '20px' }}
    //   id='volunteer-phone'
    //   label='Phone'
    //   variant='outlined'
    //   value={volunteerPhone}
    //   onChange={(e) => {
    //     setVolunteerPhone(e.target.value)
    //     e.preventDefault()
    //   }}
    //   error={volunteerPhone.length !== 0 && !/^\d{10}$/.test(volunteerPhone)}
    //   helperText={
    //     volunteerPhone.length !== 0 && !/^\d{10}$/.test(volunteerPhone)
    //       ? 'Please enter a valid phone number'
    //       : ''
    //   }
    //   required
    //   color='success'
    // />
    //       </div>
    //       <div>
    // <TextField
    //   style={{ paddingBottom: '20px' }}
    //   id='volunteer-password'
    //   type='password'
    //   label='Password'
    //   variant='outlined'
    //   value={volunteerPassword}
    //   onChange={(e) => {
    //     setVolunteerPassword(e.target.value)
    //     e.preventDefault()
    //   }}
    //   autoComplete='current-password'
    //   required
    //   color='success'
    // />
    //       </div>
    //       <div>
    //      <DropDown props={{ volunteerProvision, setVolunteerProvision }} />
    //      <Select
    //   labelId='demo-multiple-chip-label'
    //   id='demo-multiple-chip'
    //   multiple
    //   value={volunteerProvisions}
    //   onChange={(e: SelectChangeEvent<Provision[]>) => {
    //     // const provision: Provision = {
    //     //   value: e.target.value[0],
    //     //   label: e.target.value[0],
    //     // }
    //     setVolunteerProvisions([...volunteerProvisions, {
    //       value: e.target.value[0],
    //       label: e.target.value[0]
    //     }])
    //     console.log(e.target.value)
    //     e.preventDefault()
    //   }}
    //   input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
    //   renderValue={(selected) => (
    //     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
    //       {selected.map((provision: Provision) => (
    //         <Chip key={provision.value} label={provision.label} />
    //       ))}
    //     </Box>
    //   )}
    //   MenuProps={MenuProps}
    // >
    //   {provisionOptions.map((provisionOption: ProvisionOption) => (
    //     <MenuItem
    //       key={provisionOption.value}
    //       value={provisionOption.value}
    //       style={getStyles(provisionOption, provisionOptions, theme)}
    //     >
    //       {provisionOption.label}
    //     </MenuItem>
    //   ))}
    // </Select>
    //       </div>
    // <Button
    //   type='submit'
    //   variant='contained'
    //   color='success'
    //   disabled={!(volunteerName && volunteerPhone)}
    //   // && volunteerProvision.length
    // >
    //   Submit
    // </Button>
    //       {error}
    //     </div>
    //   </form>
    //   </Paper>
    // </div>
    <div style={{ background: 'linear-gradient(white,#0073e6,white)' }}>
      <ThemeProvider theme={theme}>
        <Paper elevation={20} style={paperStyles}>
          <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography
                component='h1'
                variant='h4'
                align='center'
                style={{ fontFamily: '"Times New Roman", Times, serif', textAlign: 'center' }}
              >
                Volunteer Registration Form
              </Typography>
              <Typography
                variant='h6'
                style={{ textAlign: 'center', padding: '5px', paddingBottom: '10px' }}
              >
                Fill the form to be a part of the mission
              </Typography>
              <Grid container>
                <Grid
                  item
                  style={{
                    alignItems: 'left',
                    paddingTop: '15px',
                    fontFamily: '"Times New Roman", Times, serif',
                  }}
                >
                  <Link href='/volunteer/login' variant='body1'>
                    Already Registered? Sign-In
                  </Link>
                </Grid>
              </Grid>
              <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                <TextField
                  margin='normal'
                  fullWidth
                  autoFocus
                  // style={{ paddingBottom: '20px' }}
                  id='volunteer-name'
                  label='Name'
                  variant='outlined'
                  value={volunteerName}
                  onChange={(e) => {
                    setVolunteerName(e.target.value)
                    e.preventDefault()
                  }}
                  error={
                    volunteerName.length !== 0 &&
                    !/^[A-Z]?[a-z]*(\s[A-Z])?[a-z]*$/.test(volunteerName)
                  }
                  helperText={
                    volunteerName.length !== 0 &&
                    !/^[A-Z]?[a-z]*(\s[A-Z])?[a-z]*$/.test(volunteerName)
                      ? 'Please enter a valid name'
                      : ''
                  }
                  required
                />
                <TextField
                  // style={{ paddingBottom: '20px' }}
                  margin='normal'
                  fullWidth
                  autoFocus
                  id='volunteer-phone'
                  label='Phone'
                  variant='outlined'
                  value={volunteerPhone}
                  onChange={(e) => {
                    setVolunteerPhone(e.target.value)
                    e.preventDefault()
                  }}
                  error={volunteerPhone.length !== 0 && !/^\d{10}$/.test(volunteerPhone)}
                  helperText={
                    volunteerPhone.length !== 0 && !/^\d{10}$/.test(volunteerPhone)
                      ? 'Please enter a valid phone number'
                      : ''
                  }
                  required
                />
                <TextField
                  // style={{ paddingBottom: '20px' }}
                  margin='normal'
                  fullWidth
                  autoFocus
                  id='volunteer-password'
                  type='password'
                  label='Password'
                  variant='outlined'
                  value={volunteerPassword}
                  onChange={(e) => {
                    setVolunteerPassword(e.target.value)
                    e.preventDefault()
                  }}
                  autoComplete='current-password'
                  required
                />
                {/* <DropDown props={{ volunteerProvision, setVolunteerProvision }} />  */}
                <Box style={{ paddingTop: '15px' }}>
                  <FormControl fullWidth>
                    <InputLabel id='input label'>Select Help</InputLabel>
                    <Select
                      labelId='demo-multiple-chip-label'
                      id='demo-multiple-chip'
                      multiple
                      autoFocus
                      fullWidth
                      label='Select Help'
                      value={volunteerProvisions}
                      // required
                      // onChange={(e: SelectChangeEvent<Provision[]>) => {
                      //   // const provision: Provision = {
                      //   //   value: e.target.value[0],
                      //   //   label: e.target.value[0],
                      //   // }
                      //   setVolunteerProvisions([
                      //     ...volunteerProvisions,
                      //     {
                      //       value: e.target.value[0],
                      //       label: e.target.value[0],
                      //     },
                      //   ])
                      //   console.log(e.target.value)
                      //   e.preventDefault()
                      // }}
                      // input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
                      // renderValue={(selected) => (
                      //   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      //     {selected.map((provision: Provision) => (
                      //       <Chip key={provision.value} label={provision.label} />
                      //     ))}
                      //   </Box>
                      // )}
                      // MenuProps={MenuProps}
                    >
                      {/* {provisionOptions.map((provisionOption: ProvisionOption) => (
                  <MenuItem
                    key={provisionOption.value}
                    value={provisionOption.value}
                    style={getStyles(provisionOption, provisionOptions, theme)}
                  >
                    {provisionOption.label}
                  </MenuItem>
                ))} */}
                    </Select>
                  </FormControl>
                </Box>
                <Box textAlign='center' style={{ paddingTop: '30px', paddingBottom: '50px' }}>
                  <Button
                    type='submit'
                    size='large'
                    variant='contained'
                    disabled={!(volunteerName && volunteerPhone)}
                    // && volunteerProvision.length
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </Paper>
        <div style={{ color: 'red' }}>{error}</div>
      </ThemeProvider>
    </div>
  )
}

export default VolunteerRegistrationForm
