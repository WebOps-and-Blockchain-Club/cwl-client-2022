import React, { useState } from 'react'

function VolunteerLogin() {
  const [volunteerName, setVolunteerName]: [string, React.Dispatch<React.SetStateAction<string>>] =
    useState('')
  const [volunteerPhone, setVolunteerPhone]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ] = useState('')

  const handleSubmit = (): void => {
    console.log(volunteerName, volunteerPhone)
  }

  return (
    <div>
      <form
        action='post'
        onSubmit={(e) => {
          handleSubmit()
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
        <button>Submit</button>
      </form>
    </div>
  )
}

export default VolunteerLogin
