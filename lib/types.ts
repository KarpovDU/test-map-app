export type MarkerData = {
    id: number
    name: string
    coordinates: LatLng
    email: string
    phoneNumber: number
    workTime: string
    company: string
}

export interface LatLng {
    lat: number;
    lng: number;
}

export interface MarkerState {
    markers: MarkerData[];
    selectedMarker: MarkerData;
    zoomedMarkerCoordinates: {
        coordinates: LatLng
        zoomTime: number
    };
}