import ComplaintTable from './ComplaintTable'
import { useQuery } from '@apollo/client'
import { GetIssuesDocument } from '../../generated'

function CompliantDashboard() {
  const { data: issues } = useQuery(GetIssuesDocument)
  return (
    <div>
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
        {issues && <ComplaintTable props={{ issues: issues?.getIssues }} />}
      </div>
    </div>
  )
}

export default CompliantDashboard
