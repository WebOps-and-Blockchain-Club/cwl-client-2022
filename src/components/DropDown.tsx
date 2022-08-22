import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import Provision from '../interfaces/VolunteerSide/Provision'
import { provisionOptions } from '../utils/ProvisionData'

const animatedComponents = makeAnimated()

interface State {
  volunteerProvisions: Provision[]
  setVolunteerProvisions: React.Dispatch<React.SetStateAction<never[]>>
}

interface Prop {
  props: State
}

function DropDown(props: Prop) {
  const { volunteerProvisions, setVolunteerProvisions }: State = props.props
  return (
    <div>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        value={volunteerProvisions}
        isMulti={true}
        options={provisionOptions}
        // eslint-disable-next-line
        onChange={(options: any): void => {
          setVolunteerProvisions(options)
        }}
      />
    </div>
  )
}

export default DropDown
