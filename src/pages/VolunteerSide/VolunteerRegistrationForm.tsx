<<<<<<< HEAD
import { useState } from 'react'
import Provision from '../../interfaces/VolunteerSide/Provision'
=======
import { SetStateAction, useState } from 'react'
import Provision from '../../interfaces/VolunteerSide/Provision'
import Volunteer from '../../interfaces/VolunteerSide/Volunteer'
import DropDown from '../../components/DropDown'
import { makeStyles } from '@mui/styles'
>>>>>>> 659c561f0dbf71c7f13b0ada7305285cefd0665f
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Link,
  CssBaseline,
  Box,
  Container,
  Select,
  OutlinedInput,
<<<<<<< HEAD
=======
  Chip,
  MenuItem,
>>>>>>> 659c561f0dbf71c7f13b0ada7305285cefd0665f
  Avatar,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
} from '@mui/material'
<<<<<<< HEAD
import { Assignment, Visibility, VisibilityOff } from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import '../../styles/VolunteerRegistrationForm.css'
import { useMutation } from '@apollo/client'
import { SignUpDocument } from '../../generated'
const theme = createTheme()
const paperStyles = {
  padding: '30px 60px',
  width: 575,
  margin: '60px auto',
  display: 'flex',
  borderRadius: '10px',
}

=======
import AssignmentIcon from '@mui/icons-material/Assignment'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import '../../styles/VolunteerRegistrationForm.css'
const theme = createTheme()
const useStyles: any = makeStyles({
  main: {
    textAlign: 'center',
    margin: 'auto',
    padding: '0 100px',
  },
  content: {},
})
const paperStyles = {
  padding: '30px 60px',
  width: 575,
  margin: '60px auto',
  display: 'flex',
  borderRadius: '10px',
}

>>>>>>> 659c561f0dbf71c7f13b0ada7305285cefd0665f
function VolunteerRegistrationForm({
  err,
}: {
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
<<<<<<< HEAD
  const [error, setError] = useState(err)
=======
  const [error, setError] = useState('')
  const classes = useStyles()
>>>>>>> 659c561f0dbf71c7f13b0ada7305285cefd0665f
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
<<<<<<< HEAD
=======

  // const theme = useTheme()
  // const navigate: any = useNavigate();
  // const volunteerList = useRef([]);
  if (err) setError(err)
>>>>>>> 659c561f0dbf71c7f13b0ada7305285cefd0665f

  const [signUp, { data }] = useMutation(SignUpDocument, {
    variables: {
      volunteerInput: {
        username: volunteerName,
        phoneNumber: volunteerPhone,
        tags: JSON.stringify(volunteerProvisions),
        password: volunteerPassword,
      },
    },
  })
  console.log(data)

  const handleSubmit = async (): Promise<void> => {
    try {
      const { data } = await signUp({
        variables: {
          volunteerInput: {
            username: volunteerName,
            phoneNumber: volunteerPhone,
            password: volunteerPassword,
            tags: JSON.stringify(volunteerProvisions),
          },
        },
      })

      console.log(data)
      // eslint-disable-next-line
    } catch (error: any) {
      setError(error.message)
      console.error(error)
    }
  }

  return (
<<<<<<< HEAD
=======
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
    // <div style={{ background: 'linear-gradient(white,#0073e6,white)' }}>
>>>>>>> 659c561f0dbf71c7f13b0ada7305285cefd0665f
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
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
<<<<<<< HEAD
              <Assignment />
=======
              <AssignmentIcon />
>>>>>>> 659c561f0dbf71c7f13b0ada7305285cefd0665f
            </Avatar>
            <Typography
              component='h1'
              variant='h4'
              align='center'
              style={{ fontFamily: '"Times New Roman", Times, serif', textAlign: 'center' }}
            >
              Volunteer Registration Form
            </Typography>
            <Typography
              // variant='h6'
              color='#bdbdbd'
              fontSize='8'
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
<<<<<<< HEAD
            <Box
              component='form'
              // eslint-disable-next-line
              onSubmit={(e: any) => {
                e.preventDefault()
                handleSubmit()
              }}
              noValidate
              sx={{ mt: 3 }}
            >
=======
            <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
>>>>>>> 659c561f0dbf71c7f13b0ada7305285cefd0665f
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
              <Box style={{ paddingTop: '15px' }}>
                <FormControl fullWidth required variant='outlined'>
                  <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
                  <OutlinedInput
                    id='volunteer-password'
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    value={volunteerPassword}
                    label='Password'
                    onChange={(e) => {
                      setVolunteerPassword(e.target.value)
                      e.preventDefault()
                    }}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          edge='end'
                        >
                          {!showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    required
                  />
                </FormControl>
              </Box>
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
                  disabled={!(volunteerName && volunteerPhone && volunteerPassword)}
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
    // </div>
  )
}

export default VolunteerRegistrationForm
