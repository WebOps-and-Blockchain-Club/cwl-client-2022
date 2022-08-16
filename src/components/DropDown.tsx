import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import Provision from '../interfaces/VolunteerSide/Provision'
import { provisionOptions } from '../utils/ProvisionData'

const animatedComponents = makeAnimated()

interface State {
  volunteerProvision: Provision[]
  setVolunteerProvision: React.Dispatch<React.SetStateAction<never[]>>
}

interface Prop {
  props: State
}

function DropDown(props: Prop) {
  const { volunteerProvision, setVolunteerProvision }: State = props.props
  return (
    <div>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        value={volunteerProvision}
        isMulti={true}
        options={provisionOptions}
        // eslint-disable-next-line
        onChange={(options: any): void => {
          setVolunteerProvision(options)
        }}
      />
    </div>
  )
}

export default DropDown
