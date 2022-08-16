import { useState } from 'react'
import useFetch from '../../hooks/useFetch'
// import { useNavigate } from "react-router-dom";
import Provision from '../../interfaces/VolunteerSide/Provision'
import Volunteer from '../../interfaces/VolunteerSide/Volunteer'
import DropDown from '../../components/DropDown'
import '../../styles/App.css'

function VolunteerRegistrationForm() {
  const [volunteerName, setVolunteerName]: [string, React.Dispatch<React.SetStateAction<string>>] =
    useState('')
  const [volunteerPhone, setVolunteerPhone]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ] = useState('')
  const [volunteerProvision, setVolunteerProvision]: [
    Provision[],
    React.Dispatch<React.SetStateAction<never[]>>,
  ] = useState([])
  const [error, setError] = useState('')
  // const navigate: any = useNavigate();
  // const volunteerList = useRef([]);
  const {
    data: volunteerList,
    isPending, //eslint-disable-line
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
        provisions: volunteerProvision.map((option: Provision, index: number) => option.value), //eslint-disable-line
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
          width: '100vw',
          border: '1px solid black',
          fontSize: '40px',
        }}
      >
        Volunteer Registration Form
      </div>
      <div className='subtitle'>Fill the form to be a part of the mission</div>
      <div id='already-registered'>Already registered?</div>

      <form
        action='post'
        onSubmit={(e) => {
          handleSubmit()
          // navigate("/something", { replace: true });
          e.preventDefault()
        }}
      >
        <input
          type='text'
          name='volunteer-name'
          id='volunteer-name'
          placeholder='Name...'
          value={volunteerName}
          onChange={(e) => {
            setVolunteerName(e.target.value)
            e.preventDefault()
          }}
          required
        />
        <input
          type='text'
          name='volunteer-phone'
          id='volunteer-phone'
          placeholder='Phone Number...'
          value={volunteerPhone}
          onChange={(e) => {
            setVolunteerPhone(e.target.value)
            e.preventDefault()
          }}
          required
        />
        <DropDown props={{ volunteerProvision, setVolunteerProvision }} />
        <button>Submit</button>
        {error}
      </form>
    </div>
  )
}

export default VolunteerRegistrationForm
