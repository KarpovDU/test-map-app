export type MarkerData = {
    id: number
    name: string
    coordinates: LatLng
    email: string
    phoneNumber: string
    workTime: string
    company: string
}

export interface LatLng {
    lat: number;
    lng: number;
}

export interface InvalidInputs {
    name: boolean
    phoneNumber: boolean
    email: boolean
}

export interface MarkerState {
    markers: MarkerData[];
    selectedMarker: MarkerData;
    zoomedMarkerCoordinates: LatLng
    searchValue: string
    zoomTime: number
    invalidInputs: InvalidInputs
}