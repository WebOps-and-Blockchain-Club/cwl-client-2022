import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import GMT2IST from '../utils/GMT2IST'
import getColorByDepth from '../utils/getColorByDepth'
// import { useQuery } from '@apollo/client'
// import { GetWaterDataDocument } from '../generated'

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default

// eslint-disable-next-line
export default function Map({ waterData }: { waterData: any }) {
  const mapContainer = useRef(null)
  // eslint-disable-next-line
  const map: any = useRef(null)
  const [lng, setLng] = useState(13.0827)
  const [lat, setLat] = useState(80.2707)
  const [zoom, setZoom] = useState(9)
  // const [isWaterData, setIsWaterData] = useState(false)
  // const { data: waterData } = useQuery(GetWaterDataDocument)
  // setIsWaterData(true)
  const placeMarkers = () => {
    // eslint-disable-next-line
    waterData?.getWaterData.map((e: any) => {
      const coord = JSON.parse(e.location)
      return new mapboxgl.Marker({ color: getColorByDepth(e.depth) })
        .setLngLat([coord.lng, coord.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h4>Water Level:${e.depth}cm</h4><img src='${e.image}' height='120px' class="popup-img"><div>${GMT2IST(
                e.date
                  .toLocaleString(undefined, {
                    timeZone: 'Asia/Kolkata',
                  })
                  .slice(11, 19),
              )}</div>`,
            ),
        )
        .addTo(map.current)
    })
  }

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_SECRET_KEY || ' '
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lat, lng],
      zoom: zoom,
    })
    if (!map.current) return // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })
  }, [])

  placeMarkers()

  return (
    <div>
      <div ref={mapContainer} className='map-container' />
    </div>
  )
}
