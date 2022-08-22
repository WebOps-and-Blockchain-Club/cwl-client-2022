import Provision from '../interfaces/VolunteerSide/Provision'
import { provisionOptions } from '../utils/ProvisionData'
interface State {
  volunteerProvision: Provision[]
  setVolunteerProvision: React.Dispatch<React.SetStateAction<never[]>>
}

interface Prop {
  props: State
}

function DropDown(props: Prop) {
  const { volunteerProvision, setVolunteerProvision }: State = props.props
  return <div>Hi</div>
}

export default DropDown
