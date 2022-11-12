import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import GMT2IST from '../../utils/GMT2IST'
import getColorByDepth from '../../utils/getColorByDepth'
import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { useQuery } from '@apollo/client'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import '../../images/mapbox-icon.png'
import '../../styles/MapDisplay.css'
import '../../styles/Marker.css'
import { GetWaterDataDocument } from '../../generated'
import { Popup } from 'react-map-gl'
// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default
// eslint-disable-next-line
export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const { data: waterData } = useQuery(GetWaterDataDocument)
  // eslint-disable-next-line
  const map: any = useRef(null)
  const [lng, setLng] = useState(13.0827)
  const [lat, setLat] = useState(80.2707)
  const [zoom, setZoom] = useState(9)
  const placeMarkers = () => {
    // console.log(waterData)
    waterData?.getWaterData.map(
      (e: { location: string; depth: number; image: string; date: Date }) => {
        const coord = JSON.parse(e.location)
        return new mapboxgl.Marker({ color: getColorByDepth(e.depth) })
          .setLngLat([coord.lng, coord.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                `<h4>Water Level: ${e.depth}cm</h4>${e.image !== ''
                  ? `<img src='${e.image}' height='120px' style=margin:10px>`
                  : '<div style=height:20px;width:10px></div>'
                }<div style=font-size:13px >Time: ${GMT2IST(
                  e.date
                    .toLocaleString(undefined, {
                      timeZone: 'Asia/Kolkata',
                    })
                    .slice(11, 19),
                )}</div>`,
              ),
          )
          .addTo(map.current)
      },
    )
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
    const search = new MapBoxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: false,
      mapboxgl: mapboxgl,
      collapsed: true,
    })
    map.current.addControl(search, 'top-right')
    map.current.addControl(new mapboxgl.NavigationControl());

    // Tile set for map
    // map.current.on('load', () => {
    //   map.current.addSource('chennai-wards-2011-30akus', {
    //     type: 'vector',
    //     // Use any Mapbox-hosted tileset using its tileset id.
    //     // Learn more about where to find a tileset id:
    //     // https://docs.mapbox.com/help/glossary/tileset-id/
    //     url: 'mapbox://ishu114407.a94zinsr'
    //   });
    //   map.current.addLayer({
    //     'id': 'wardline',
    //     'type': 'fill',
    //     'source': 'chennai-wards-2011-30akus',
    //     'source-layer': 'New_Wards_from_Oct_2011',
    //     // 'layout': {

    //     //   'line-join': 'round',
    //     //   'line-cap': 'round'
    //     // },
    //     'paint': {
    //       'fill-color': "#69b6ff",
    //       'fill-opacity': 0.2
    //     }
    //   });
    // });

    map.current.on('load', () => {
      map.current.addSource('Tharun_1-0kf601', {
        type: 'vector',
        // Use any Mapbox-hosted tileset using its tileset id.
        // Learn more about where to find a tileset id:
        // https://docs.mapbox.com/help/glossary/tileset-id/
        url: 'mapbox://ishu114407.3yoemmtv'
      });
      map.current.addLayer({
        'id': 'wardline',
        'type': 'fill',
        'source': 'Tharun_1-0kf601',
        'source-layer': 'Tharun_1-0kf601',
        // 'layout': {

        //   'line-join': 'round',
        //   'line-cap': 'round'
        // },
        'paint': {
          'fill-color': ['get', 'color'],
          'fill-opacity': 0.5
        }
      });
    });

    // 12345678i9o
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });
    map.current.on('click', 'wardline', (e: { features: any[] }) => {
      const trailhead = e.features[0];
      console.log(trailhead)
      popup
        .setHTML(`<b>${trailhead.properties.name}</b>${trailhead.properties.description}`)
        .setLngLat(trailhead.geometry.coordinates[0][0])
        .addTo(map.current);

    });
    map.current.on('mouseleave', 'wardline', (e: { features: any[] }) => {
      popup.remove()

    });

    // tile set ends



    // Add geolocate control to the map.
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
    )
    map.current.on('load', () => {
      map.current.addSource('earthquakes', {
        type: 'JSON',
        data: waterData?.getWaterData,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
        clusterProperties: {
          clusterTotal: ['+', ['get', 'depth']],
        },
      })

      map.current.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 10, '#f1f075', 20, '#f28cb1'],
          'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
        },
      })

      map.current.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': [
            'concat',
            [
              'round',
              ['/', ['number', ['get', 'clusterTotal']], ['number', ['get', 'point_count']]],
            ],
          ],
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
          'text-allow-overlap': true,
        },
      })
      map.current.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'earthquakes',
        filter: ['!', ['has', 'point_count']],

        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 10,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
        },
      })
    })
  }, [])
  placeMarkers()
  return (
    <div>
      <div
        style={{
          position: 'fixed',
          bottom: '5px',
          right: '5px',
          zIndex: 1000,
          backgroundColor: 'white',
          textAlign: 'right',
        }}
      >
        <img
          src={require('../../images/floodGradient.png')}
          alt={'ScaleImage'}
          width='150px'
          style={{ maxWidth: '70vw' }}
        />
      </div>
      <div style={{ maxHeight: 'calc(100vh)', overflow: 'hidden' }}>
        <div ref={mapContainer} className='map-container' style={{ height: '100vh' }} />
      </div>
    </div>
  )
}
