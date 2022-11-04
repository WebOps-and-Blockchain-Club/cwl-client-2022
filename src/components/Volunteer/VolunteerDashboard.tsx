import VolunteerTable from './VolunteerTable'
import { useQuery } from '@apollo/client'
import { GetVolunteersDocument } from '../../generated'
const VolunteerDashboard = () => {
  const { data: volunteer } = useQuery(GetVolunteersDocument)
  console.log(volunteer)
  return (
    <div
      style={{
        display: 'flexColumn',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        paddingLeft: '20px',
        borderRadius: '10px',
      }}
    >
      {volunteer && <VolunteerTable props={{ volunteer: volunteer?.getVolunteers }} />}
    </div>
  )
}

export default VolunteerDashboard
