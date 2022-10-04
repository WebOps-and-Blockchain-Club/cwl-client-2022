import { useQuery } from '@apollo/client'
import ClusterMap from '../components/cluster-map/ClusterMap'
import Map from '../components/Map'
import { GetWaterDataDocument } from '../generated'
import '../styles/MapDisplay.css'
import '../styles/Marker.css'

const Home = () => {
  const { data: waterData } = useQuery(GetWaterDataDocument)
  return (
    <div>
      <Map waterData={waterData} />
      {/* <ClusterMap waterData={waterData} /> */}
    </div>
  )
}

export default Home
