import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import GMT2IST from '../utils/GMT2IST'
import getColorByDepth from '../utils/getColorByDepth'
import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import MapboxGeocoder from '@mapbox/mapbox-gl-directions';


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
              `<h4>Water Level:${e.depth}cm</h4><img src='${e.image}' height='120px'><div class="date">${GMT2IST(
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
    });
    const search = new MapBoxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: true,
      mapboxgl: mapboxgl,
      collapsed: true,
    });
    map.current.addControl(search, 'top-right');
    search.on('result', (e) => {
      const coord = e.result.geometry.coordinates;
      return new mapboxgl.Marker({ color: getColorByDepth(e.depth) })
        .setLngLat([coord.lng, coord.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h4>Water Level:${e.depth}cm</h4><img src='${e.image}' height='120px'><div class="date">${GMT2IST(
                e.date
                  .toLocaleString(undefined, {
                    timeZone: 'Asia/Kolkata',
                  })
                  .slice(11, 19),
              )}</div>`,
            ),
        )
        .addTo(map.current)
    });
    // Add geolocate control to the map.
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      })
    );
    map.current.on('load', () => {
      // Add a new source from our GeoJSON data and
      // set the 'cluster' option to true. GL-JS will
      // add the point_count property to your source data.
      map.current.addSource('earthquakes', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });

      map.current.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1'
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40
          ]
        }
      });

      map.current.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      });

      map.current.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'earthquakes',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff'
        }
      });

      // inspect a cluster on click
      map.current.on('click', 'clusters', (e: { point: any }) => {
        const features = map.current.queryRenderedFeatures(e.point, {
          layers: ['clusters'],
          zoom: zoom
        });
        const clusterId = features[0].properties.cluster_id;
        map.current.getSource('earthquakes').getClusterExpansionZoom(
          clusterId,
          (err: any, zoom: any) => {
            if (err) return;

            map.current.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom
            });
          }
        );
      });

      // When a click event occurs on a feature in
      // the unclustered-point layer, open a popup at
      // the location of the feature, with
      // description HTML from its properties.
      map.current.on('click', 'unclustered-point', (e: any) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const mag = e.features[0].properties.mag;
        const tsunami =
          e.features[0].properties.tsunami === 1 ? 'yes' : 'no';

        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(
            `magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`
          )
          .addTo(map.current);
      });

      map.current.on('mouseenter', 'clusters', () => {
        map.current.getCanvas().style.cursor = 'pointer';
      });
      map.current.on('mouseleave', 'clusters', () => {
        map.current.getCanvas().style.cursor = '';
      });
    });
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
          src={require('../images/floodGradient.png')}
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
