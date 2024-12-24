export interface MarkerData extends LatLng {
    id: number
    name: string
    email: string
    phonenumber: string
    worktime: string
    company: string
} 

export type NewMarker = Omit<MarkerData, 'id'>

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
    temporaryMarker: LatLng | null
    invalidInputs: InvalidInputs
}