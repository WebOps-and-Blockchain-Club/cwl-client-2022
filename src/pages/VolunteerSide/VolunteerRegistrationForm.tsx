import { useState } from 'react'
import useFetch from '../../hooks/useFetch'
// import { useNavigate } from "react-router-dom";
import Provision from '../../interfaces/VolunteerSide/Provision'
import Volunteer from '../../interfaces/VolunteerSide/Volunteer'
// import DropDown from '../../components/DropDown'
import { provisionOptions, ProvisionOption } from '../../utils/ProvisionData'
import { MenuProps } from '../../utils/MenuProps'
import {
  Box,
  Button,
  Chip,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  useTheme,
} from '@mui/material'
import '../../styles/VolunteerRegistrationForm.css'
import { getStyles } from '../../utils/GetStyles'

function VolunteerRegistrationForm() {
  const [volunteerName, setVolunteerName]: [string, React.Dispatch<React.SetStateAction<string>>] =
    useState('')
  const [volunteerPhone, setVolunteerPhone]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ] = useState('')
  // eslint-disable-next-line
  const [volunteerProvision, setVolunteerProvision]: [
    Provision[],
    React.Dispatch<React.SetStateAction<never[]>>,
  ] = useState([])
  const [error, setError] = useState('')
  const theme = useTheme()
  // const navigate: any = useNavigate();
  // const volunteerList = useRef([]);
  const {
    data: volunteerList,
    error: err, //eslint-disable-line
  } = useFetch('http://localhost:5000/volunteers/')
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
        provisions: volunteerProvision.map((option: Provision) => option.value),
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
      // eslint-disable-next-line
    } catch (error: any) {
      setError(error.message)
      console.error(error)
    }
  }

  return (
    <div className='App'>
      <div
        className='title'
        style={{
          textAlign: 'center',
          fontSize: '40px',
        }}
      >
        Volunteer Registration Form
      </div>
      <div className='subtitle'>Fill the form to be a part of the mission</div>
      <br />

      <form
        action='post'
        onSubmit={(e) => {
          handleSubmit()
          // navigate("/something", { replace: true });
          e.preventDefault()
        }}
      >
        <TextField
          id='volunteer-name'
          label='Name'
          variant='outlined'
          value={volunteerName}
          onChange={(e) => {
            setVolunteerName(e.target.value)
            e.preventDefault()
          }}
          error={!/^[A-Z]?[a-z]*(\s[A-Z])?[a-z]*$/.test(volunteerName)}
          helperText='Please enter a valid full name'
          required
        />
        <TextField
          id='volunteer-phone'
          label='Phone'
          variant='outlined'
          value={volunteerPhone}
          onChange={(e) => {
            setVolunteerPhone(e.target.value)
            e.preventDefault()
          }}
          error={volunteerPhone.length !== 0 && !/^\d{10}$/.test(volunteerPhone)}
          helperText='Please enter a valid phone number'
          required
        />
        {/* <DropDown props={{ volunteerProvision, setVolunteerProvision }} /> */}
        <Select
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple
          value={volunteerProvision}
          onChange={(e: SelectChangeEvent<Provision[]>) => {
            // let provision: Provision = { // eslint-disable-line
            //   value: e.target.value[0],
            //   label: e.target.value[0]
            // }
            // let tempArr = volunteerProvision; // eslint-disable-line
            // tempArr.push(provision);
            // setVolunteerProvision(tempArr);
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
        </Select>
        <Button
          variant='contained'
          disabled={!(volunteerName && volunteerPhone && volunteerProvision.length)}
        >
          Submit
        </Button>
        {error}
      </form>
    </div>
  )
}

export default VolunteerRegistrationForm
