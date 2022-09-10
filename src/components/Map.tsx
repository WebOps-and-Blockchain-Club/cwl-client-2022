import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useQuery } from '@apollo/client'
import { GetWaterDataDocument } from '../generated'

export default function Map() {
  const mapContainer = useRef(null)
  const map: any = useRef(null)
  const [lng, setLng] = useState(13.0827)
  const [lat, setLat] = useState(80.2707)
  const [zoom, setZoom] = useState(9)
  const [isWaterData, setIsWaterData] = useState(false)
  const { data: waterData } = useQuery(GetWaterDataDocument)
  setIsWaterData(true)

  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiaXNodTExNDQwNyIsImEiOiJjbDRsMnNhZW8waTk0M2JxcGx0N2liYTNqIn0.SQAlOr75DZykR8FMj57FlA'
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
    function getdata() {
      console.log(waterData)
      // eslint-disable-next-line
      waterData?.getWaterData.map((e: any) => {
        const coord = JSON.parse(e.location)
        console.log(coord)
        return new mapboxgl.Marker()
          .setLngLat([coord.lng, coord.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(`<h4>Water Level:${e.depth}</h4><img src='${e.image}' height='120px'>`),
          )
          .addTo(map.current)
      })
    }
    getdata()
  }, [isWaterData])
  return (
    <div>
      <div ref={mapContainer} className='map-container' />
    </div>
  )
}
