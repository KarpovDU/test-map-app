'use client'

import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { DragEndEvent, Marker as LeafletMarker, Map } from 'leaflet';
import store, { AppDispatch, RootState } from '@/lib/Store';
import { useDispatch, useSelector } from 'react-redux';
import { editCoords, editMarker, markerZoom, selectMarker } from '@/lib/markerSlice';
import { FaRegEnvelope, FaRegCalendarDays, FaRegBuilding } from "react-icons/fa6";
import { HiOutlinePhone } from "react-icons/hi2";
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl
});



const MapComponent: React.FC = () => {
    const mapRef = useRef<Map | null>(null);
    const markerRef = useRef(null)

    const markers = useSelector((state: RootState) => state.markers);
    const selectedCoordinates = markers.zoomedMarkerCoordinates
    const zoomTime = useSelector((state: RootState) => state.markers.zoomTime);


    const dispatch = useDispatch<AppDispatch>();

    const handleMarkerClick = (id: number) => {
        const selectedId = store.getState().markers.selectedMarker.id
        if (selectedId === id) dispatch(markerZoom())
        else dispatch(selectMarker(id))
    }

    const dragMarker = (leafletMarker: LeafletMarker) => {
        const latLng = {...leafletMarker.getLatLng()}
        const data = {...store.getState().markers.selectedMarker, coordinates: latLng}
        dispatch(editMarker(data))
        dispatch(editCoords(latLng))
    }

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.flyTo([selectedCoordinates.lat, selectedCoordinates.lng], mapRef.current.getZoom());
        }
    }, [mapRef, zoomTime])

    return (
        <div className='h-full w-[50%] p-5 -z-0'>
            <MapContainer
                ref={mapRef}
                center={store.getState().markers.zoomedMarkerCoordinates}
                zoom={13}
                className='h-full w-full  rounded-2xl'
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {markers.markers.map((marker) => (
                    <Marker
                        ref={markerRef}
                        draggable={markers.selectedMarker.id === marker.id}
                        eventHandlers={{
                            click: () => handleMarkerClick(marker.id),
                            dragend: (e: DragEndEvent ) => dragMarker(e.target as LeafletMarker)
                        }}
                        key={marker.id}
                        position={markers.selectedMarker.id === marker.id ? selectedCoordinates : [marker.coordinates.lat, marker.coordinates.lng]}
                    >
                        <Popup>
                            <div className='text-medium'>{marker.id}. {marker.name}</div>
                            {marker.company !== '' ? <div className='flex'><br /><FaRegBuilding className='mr-1' /><div className='font-bold mr-1'>{marker.company}</div></div> : null}
                            {marker.email !== '' ? <div className='flex'><br /><FaRegEnvelope className='mr-1' /><div className='font-bold mr-1'>Email:</div>{marker.email}</div> : null}
                            {marker.phoneNumber ? <div className='flex'><br /><HiOutlinePhone className='mr-1' /><div className='font-bold mr-1'>Телефон:</div>{marker.phoneNumber}</div> : null}
                            {marker.workTime !== '' ? <div className='flex'><br /><FaRegCalendarDays className='mr-1' /><div className='font-bold mr-1'>Часы работы:</div>{marker.workTime}</div> : null}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent