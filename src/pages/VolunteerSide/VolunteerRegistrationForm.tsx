import { SetStateAction, useState } from 'react' // eslint-disable-line
// import { useNavigate } from "react-router-dom";
import Provision from '../../interfaces/VolunteerSide/Provision'
import Volunteer from '../../interfaces/VolunteerSide/Volunteer'
import DropDown from '../../components/DropDown'
import { makeStyles } from '@mui/styles'
// import { provisionOptions, ProvisionOption } from '../../utils/ProvisionData'
// import { MenuProps } from '../../utils/MenuProps'
import {
  // Box,
  Button,
  // Chip,
  // MenuItem,
  // OutlinedInput,
  // Select,
  // SelectChangeEvent,
  // useTheme,
  Typography,
  TextField,
} from '@mui/material'
import '../../styles/VolunteerRegistrationForm.css'
// import { getStyles } from '../../utils/GetStyles'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || ''

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
      await fetch(BACKEND_URL, {
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
    <div className='App'>
      <Typography
        variant='h4'
        style={{ textAlign: 'center', paddingBottom: '35px', padding: '20px' }}
      >
        Volunteer Registration Form
      </Typography>
      <Typography
        variant='h6'
        style={{ textAlign: 'center', padding: '5px', paddingBottom: '10px' }}
      >
        Fill the form to be a part of the mission
      </Typography>
      <div>
        <Typography
          style={{
            color: 'purple',
            fontSize: 'medium',
            textAlign: 'right',
            paddingRight: '50px',
            textDecorationLine: 'underline',
          }}
        >
          Already Registered?
        </Typography>
      </div>
      <form
        action='post'
        onSubmit={(e) => {
          handleSubmit()
          // navigate("/something", { replace: true });
          e.preventDefault()
        }}
      >
        <div className={classes.main}>
          <div>
            <TextField
              style={{ paddingBottom: '20px' }}
              id='volunteer-name'
              label='Name'
              variant='outlined'
              value={volunteerName}
              onChange={(e) => {
                setVolunteerName(e.target.value)
                e.preventDefault()
              }}
              error={
                volunteerName.length !== 0 && !/^[A-Z]?[a-z]*(\s[A-Z])?[a-z]*$/.test(volunteerName)
              }
              helperText={
                volunteerName.length !== 0 && !/^[A-Z]?[a-z]*(\s[A-Z])?[a-z]*$/.test(volunteerName)
                  ? 'Please enter a valid name'
                  : ''
              }
              required
              color='success'
            />
          </div>
          <div>
            <TextField
              style={{ paddingBottom: '20px' }}
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
              color='success'
            />
          </div>
          <div>
            <TextField
              style={{ paddingBottom: '20px' }}
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
              color='success'
            />
          </div>
          <div>
            {/* <DropDown props={{ volunteerProvision, setVolunteerProvision }} /> */}
            {/* <Select
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple
          value={volunteerProvisions}
          onChange={(e: SelectChangeEvent<Provision[]>) => {
            // const provision: Provision = {
            //   value: e.target.value[0],
            //   label: e.target.value[0],
            // }
            setVolunteerProvisions([...volunteerProvisions, {
              value: e.target.value[0],
              label: e.target.value[0]
            }])
            console.log(e.target.value)
            e.preventDefault()
          }}
          input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((provision: Provision) => (
                <Chip key={provision.value} label={provision.label} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {provisionOptions.map((provisionOption: ProvisionOption) => (
            <MenuItem
              key={provisionOption.value}
              value={provisionOption.value}
              style={getStyles(provisionOption, provisionOptions, theme)}
            >
              {provisionOption.label}
            </MenuItem>
          ))}
        </Select> */}
          </div>
          <Button
            type='submit'
            variant='contained'
            color='success'
            disabled={!(volunteerName && volunteerPhone)}
            // && volunteerProvision.length
          >
            Submit
          </Button>
          {error}
        </div>
      </form>
    </div>
  )
}

export default VolunteerRegistrationForm
