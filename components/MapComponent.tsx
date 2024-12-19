'use client'

import React, { useCallback, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { Map } from 'leaflet';
import store, { AppDispatch, RootState } from '@/lib/Store';
import { useDispatch, useSelector } from 'react-redux';
import { selectMarker } from '@/lib/markerSlice';
import { FaRegEnvelope, FaRegCalendarDays, FaRegBuilding   } from "react-icons/fa6";
import { HiOutlinePhone } from "react-icons/hi2";


L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});



const MapComponent: React.FC = () => {
    const mapRef = useRef<Map | null>(null);

    const markers = useSelector((state: RootState) => state.markers);
    const selectedCoordinates = markers.zoomedMarkerCoordinates
    const coordinates = store.getState().markers.zoomedMarkerCoordinates.coordinates

    const dispatch = useDispatch<AppDispatch>();

    const handleMarkerClick = useCallback((id: number) => () => {
        dispatch(selectMarker(id))
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.flyTo([selectedCoordinates.coordinates.lat, selectedCoordinates.coordinates.lng], mapRef.current.getZoom());
        }
    }, [mapRef, selectedCoordinates]);

    return (
        <div className='h-full w-[50%] p-5 -z-0'>
            <MapContainer
                ref={mapRef}
                center={coordinates}
                zoom={13}
                className='h-full w-full  rounded-2xl'
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {markers.markers.map((marker) => (
                    <Marker
                        eventHandlers={{
                            click: handleMarkerClick(marker.id)
                        }}
                        key={marker.id}
                        position={[marker.coordinates.lat, marker.coordinates.lng]}
                    >
                        <Popup>
                            <div className='text-medium'>{marker.id}. {marker.name}</div>
                            {marker.company !== '' ? <div className='flex'><br /><FaRegBuilding className='mr-1'/><div className='font-bold mr-1'>{marker.company}</div></div> : null}
                            {marker.email !== '' ? <div className='flex'><br /><FaRegEnvelope className='mr-1'/><div className='font-bold mr-1'>Email:</div>{marker.email}</div> : null}
                            {marker.phoneNumber ? <div className='flex'><br /><HiOutlinePhone className='mr-1'/><div className='font-bold mr-1'>Телефон:</div>{marker.phoneNumber}</div> : null}
                            {marker.workTime !== '' ? <div className='flex'><br /><FaRegCalendarDays className='mr-1'/><div className='font-bold mr-1'>Часы работы:</div>{marker.workTime}</div> : null}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;