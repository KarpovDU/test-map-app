import { InvalidInputs, LatLng, MarkerData, MarkerState } from '@/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const phoneNumberRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
const emailRegex = /^\S+@\S+\.\S+$/;

const selectedMarkerInitialState: MarkerData = {
  id: 1,
  name: '',
  coordinates: {
    lat: 0,
    lng: 0,
  },
  email: '',
  phoneNumber: '',
  workTime: '',
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

const checkValid = (obj: InvalidInputs) => {
  return Object.values(obj).filter((i: boolean) => i === true).length === 0
}

function setBooleanToFalse<T extends { [key: string]: any }>(obj: T): T {

    for (const key in obj) {
         if (typeof obj[key] === 'boolean') {
           obj[key] = false as T[typeof key]
       }
   }
   console.log(obj)
    return obj;
 }

const initialState: MarkerState = {
  markers: [],
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
        state.zoomedMarkerCoordinates = action.payload.coordinates
        state.zoomTime = Date.now()
        const length = state.markers.length
        const newState = {
          ...selectedMarkerInitialState,
          id: length + 1
        }
        state.selectedMarker = newState
      }
    },
    selectMarker: (state, action: PayloadAction<number>) => {
      state.markers.map((e) => e.id == action.payload ? state.selectedMarker = e : null)
      state.zoomedMarkerCoordinates = state.selectedMarker.coordinates
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
        state.zoomedMarkerCoordinates = state.selectedMarker.coordinates
        state.zoomTime = Date.now()
        const length = state.markers.length
        const newState = {
          ...selectedMarkerInitialState,
          id: length + 1
        }
        state.selectedMarker = newState
      }
    },
    newMarker: (state,) => {

      const length = state.markers.length
      const newState = {
        ...selectedMarkerInitialState,
        id: length + 1
      }
      state.selectedMarker = newState

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
      state.selectedMarker.name === '' ? state.invalidInputs.name = true : null
      state.invalidInputs.phoneNumber = !(phoneNumberRegex.test(state.selectedMarker.phoneNumber) || state.selectedMarker.phoneNumber === '')
      state.invalidInputs.email = !(emailRegex.test(state.selectedMarker.email) || state.selectedMarker.email === '')
    }
  }
});

export const { addMarker, selectMarker, editMarker, newMarker, saveEditedMarker, editSearchValue, editCoords, markerZoom, checkValidInputs } = markerSlice.actions;
export default markerSlice.reducer;