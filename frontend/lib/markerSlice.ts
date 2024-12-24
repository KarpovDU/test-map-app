import { getSources } from '@/api/sources';
import { InvalidInputs, LatLng, MarkerData, MarkerState } from '@/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const phoneNumberRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
const emailRegex = /^\S+@\S+\.\S+$/;

const selectedMarkerInitialState: MarkerData = {
  id: -1,
  name: '',
  lat: 0,
  lng: 0,
  email: '',
  phonenumber: '',
  worktime: '',
  company: '',
}

function getCurrentPosition(): LatLng {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        return {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      },
      () => {
        return {
          lat: 58.002358,
          lng: 56.261055,
        };
      }
    );
  }
  return {
    lat: 58.002358,
    lng: 56.261055,
  };
}

export const checkValid = (obj: InvalidInputs) => {
  return Object.values(obj).filter((i: boolean) => i === true).length === 0
}

function setBooleanToFalse<T extends { [key: string]: boolean }>(obj: T): T {

    for (const key in obj) {
         if (typeof obj[key] === 'boolean') {
           obj[key] = false as T[typeof key]
       }
   }
   console.log(obj)
    return obj;
 }

const initialState: MarkerState = {
  markers: await getSources() || [],
  selectedMarker: selectedMarkerInitialState,
  zoomedMarkerCoordinates: getCurrentPosition(),
  searchValue: '',
  zoomTime: Date.now(),
  invalidInputs: {
    name: false,
    phoneNumber: false,
    email: false
  }
};


const markerSlice = createSlice({
  name: 'markers',
  initialState,
  reducers: {
    addMarker: (state, action: PayloadAction<MarkerData>) => {
      if (checkValid(state.invalidInputs)) {
        state.markers.push({ ...action.payload });
        state.zoomedMarkerCoordinates = {lat: action.payload.lat, lng: action.payload.lng} 
        state.zoomTime = Date.now()
        state.selectedMarker = {...selectedMarkerInitialState}
      }
    },
    selectMarker: (state, action: PayloadAction<number>) => {
      state.markers.map((e) => e.id == action.payload ? state.selectedMarker = e : null)
      state.zoomedMarkerCoordinates = {lat: state.selectedMarker.lat, lng: state.selectedMarker.lng}
      state.zoomTime = Date.now()
    },
    editMarker: (state, action: PayloadAction<MarkerData>) => {
      if (!checkValid(state.invalidInputs)) {
        setBooleanToFalse(state.invalidInputs)
      }
      state.selectedMarker = action.payload
    },
    saveEditedMarker: (state,) => {
      if (checkValid(state.invalidInputs)) {
        state.markers = state.markers.map((e) => e.id === state.selectedMarker.id ? e = state.selectedMarker : e)
        state.zoomedMarkerCoordinates = {lat: state.selectedMarker.lat, lng: state.selectedMarker.lng} 

        state.zoomTime = Date.now()
        state.selectedMarker = {...selectedMarkerInitialState}
      }
    },
    newMarker: (state,) => {
      state.selectedMarker = {...selectedMarkerInitialState}
    },
    editSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
    editCoords: (state, action: PayloadAction<LatLng>) => {
      state.zoomedMarkerCoordinates = action.payload
    },
    markerZoom: (state,) => {
      state.zoomTime = Date.now()
    },
    checkValidInputs: (state,) => {
      state.invalidInputs.name = state.selectedMarker.name === '' ? true : state.invalidInputs.name
      state.invalidInputs.phoneNumber = !(phoneNumberRegex.test(state.selectedMarker.phonenumber) || state.selectedMarker.phonenumber === '')
      state.invalidInputs.email = !(emailRegex.test(state.selectedMarker.email) || state.selectedMarker.email === '')
    },
    removeMarker: (state, action: PayloadAction<number>) => {
      state.markers = state.markers.filter(el => el.id !== action.payload)
      state.selectedMarker = {...selectedMarkerInitialState}
    }
  }
});

export const { addMarker, selectMarker, editMarker, newMarker, saveEditedMarker, editSearchValue, editCoords, markerZoom, checkValidInputs, removeMarker } = markerSlice.actions;
export default markerSlice.reducer;