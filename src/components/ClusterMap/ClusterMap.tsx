import { useRef } from 'react'
import { Map, Source, Layer, LayerProps, MapRef, GeoJSONSource, LngLatLike } from 'react-map-gl'

// import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from './layers';

const ClusterMap = () => {
  const mapRef = useRef<MapRef>(null)

  const clusterLayer: LayerProps = {
    id: 'clusters',
    type: 'circle',
    source: 'earthquakes',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
      'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
    },
  }

  const clusterCountLayer: LayerProps = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'earthquakes',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    },
  }

  const unclusteredPointLayer: LayerProps = {
    id: 'unclustered-point',
    type: 'circle',
    source: 'earthquakes',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': '#11b4da',
      'circle-radius': 4,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff',
    },
  }
  const onClick = (event: {
    features: Array<{
      properties: { cluster_id: number }
      geometry: { coordinates?: LngLatLike }
    }>
  }) => {
    const feature = event.features[0]
    const clusterId = feature.properties.cluster_id

    const mapboxSource = mapRef.current?.getSource('earthquakes') as GeoJSONSource

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return
      }

      mapRef.current?.easeTo({
        center: feature.geometry.coordinates,
        zoom,
        duration: 500,
      })
    })
  }

  return (
    <>
      <Map
        initialViewState={{
          latitude: 40.67,
          longitude: -103.59,
          zoom: 3,
        }}
        mapStyle='mapbox://styles/mapbox/dark-v9'
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_SECRET_KEY}
        interactiveLayerIds={[clusterLayer?.id || '']}
        onClick={(e) => onClick(e as never)}
        ref={mapRef}
      >
        <Source
          id='earthquakes'
          type='geojson'
          data='https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </Map>
    </>
  )
}

export default ClusterMap
