import { useRef, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L, { DragEndEvent, Marker as LeafletMarker } from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { useDispatch, useSelector } from 'react-redux';
import store, { AppDispatch, RootState } from '@/lib/Store';
import { editCoords, editMarker, markerZoom, selectMarker, temporaryMarkerDrag } from '@/lib/markerSlice';
import MarkerPopup from './MarkerPopup';
 import * as ReactDOM from 'react-dom';


function MarkerCluster() {
  const [popupContainers, setPopupContainers] = useState<{ [key: number]: HTMLDivElement }>({});
   const dispatch = useDispatch<AppDispatch>();
  const map = useMap();
  const clusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);
 const markers = useSelector((state: RootState) => state.markers);

  const handleMarkerClick = (id: number) => {
    const selectedId = store.getState().markers.selectedMarker.id
    if (selectedId === id) dispatch(markerZoom())
    else dispatch(selectMarker(id))
  }

const dragMarker = (leafletMarker: LeafletMarker, temporary: boolean) => {
    const latLng = { ...leafletMarker.getLatLng() }
    const data = { ...store.getState().markers.selectedMarker, lat: latLng.lat, lng: latLng.lng }
    dispatch(editMarker(data))
    dispatch(editCoords(latLng))
    if (temporary) {
        dispatch(temporaryMarkerDrag(latLng))
    }
}
useEffect(() => {
    if (!map || clusterGroupRef.current) return;
      const clusterGroup = L.markerClusterGroup();
     clusterGroupRef.current = clusterGroup;
     markers.markers.forEach((marker) => {
      const latLng = markers.selectedMarker.id === marker.id ? {lat: markers.selectedMarker.lat, lng: markers.selectedMarker.lng} : {lat: marker.lat, lng: marker.lng}
      const leafletMarker = L.marker(new L.LatLng(latLng.lat, latLng.lng), {draggable: markers.selectedMarker.id === marker.id});

   const popupContainer = document.createElement('div');
     ReactDOM.createPortal(<MarkerPopup {...marker} />, popupContainer);

      setPopupContainers((prev) => ({ ...prev, [marker.id]: popupContainer }));
     leafletMarker.bindPopup(popupContainer);

    leafletMarker.on('click', () => handleMarkerClick(marker.id));
     leafletMarker.on('dragend', (e: DragEndEvent) => {
         const leafletMarker = e.target as LeafletMarker;

         const latLng = { ...leafletMarker.getLatLng() }
        const updatedMarker = { ...marker, lat: latLng.lat, lng: latLng.lng }
         if(updatedMarker){
             const popupContainer = document.createElement('div');
                ReactDOM.createPortal(<MarkerPopup {...updatedMarker} />, popupContainer);
                 setPopupContainers((prev) => ({ ...prev, [updatedMarker.id]: popupContainer }));
                 leafletMarker.bindPopup(popupContainer);
              }
        dragMarker(leafletMarker, false)
    });

    clusterGroup.addLayer(leafletMarker);
  });
    map.addLayer(clusterGroup);
    return () => {
       if (clusterGroupRef.current) {
          map.removeLayer(clusterGroupRef.current)
          clusterGroupRef.current = null;
        }
    };
 }, [map, markers]);
return null;
}

export default MarkerCluster;