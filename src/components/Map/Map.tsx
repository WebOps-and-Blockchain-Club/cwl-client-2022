import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import NavBar from '../NavBar/NavBar'

export default function Map() {
  const mapContainer = useRef(null)
  const map: any = useRef(null)
  const [lng, setLng] = useState(13.0827)
  const [lat, setLat] = useState(80.2707)
  const [zoom, setZoom] = useState(9)

  useEffect(() => {
    console.log(process.env.REACT_APP_MAPBOX_SECRET_KEY)
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
      fetch('http://localhost:4000/waterLevelData')
        .then((response) => response.json())
        .then((data) => {
          JSON.stringify(data)
          data.map((cord: { lng: number; lat: number; id: string; image: string }) =>
            new mapboxgl.Marker()
              .setLngLat([cord.lng, cord.lat])
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                  .setHTML(`<h3>${cord.id}</h3><img src='${cord.image}' height='100px'>`),
              )
              .addTo(map.current),
          )
        })
    }
    getdata()
  }, [])
  return (
    <div>
      <div ref={mapContainer} className='map-container' />
    </div>
  )
}
