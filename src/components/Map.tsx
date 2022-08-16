import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
mapboxgl.accessToken =
    'pk.eyJ1IjoiaXNodTExNDQwNyIsImEiOiJjbDRsMnNhZW8waTk0M2JxcGx0N2liYTNqIn0.SQAlOr75DZykR8FMj57FlA';

export default function Map() {
    const mapContainer = useRef(null);
    const map: any = useRef(null);
    const [lng, setLng] = useState(13.0827);
    const [lat, setLat] = useState(80.2707);
    const [zoom, setZoom] = useState(5);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current || '',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lat, lng],
            zoom: zoom,
        });

        if (map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
        console.log(map.current);
    }, []);


    return (
        <div>
            <div ref={mapContainer} className='map-container' />
        </div>
    );
}
