import Provision from '../interfaces/VolunteerSide/Provision'
import { provisionOptions } from '../utils/ProvisionData'
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
      {/* <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        value={volunteerProvisions}
        isMulti={true}
        options={provisionOptions}
        // eslint-disable-next-line
        onChange={(options: any): void => {
          setVolunteerProvisions(options)
        }}
      /> */}
      Hi
    </div>
  )
}

export default DropDown
