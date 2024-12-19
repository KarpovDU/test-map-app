import { LatLng, MarkerData, MarkerState } from '@/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const selectedMarkerInitialState: MarkerData = {
  id: 1,
  name: '',
  coordinates: {
    lat: 0,
    lng: 0,
  },
  email: '',
  phoneNumber: 0,
  workTime: '',
  company: '',
}

function getCurrentPosition(): LatLng  {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        return {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      },
      (error) => {
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

const initialState: MarkerState = {
  markers: [],
  selectedMarker: selectedMarkerInitialState,
  zoomedMarkerCoordinates: getCurrentPosition()
};


const markerSlice = createSlice({
  name: 'markers',
  initialState,
  reducers: {
    addMarker: (state, action: PayloadAction<MarkerData>) => {
      state.markers.push({ ...action.payload });
      state.zoomedMarkerCoordinates = action.payload.coordinates
      let length = state.markers.length
      const newState = {
        ...selectedMarkerInitialState,
        id: length + 1
      }
      state.selectedMarker = newState
    },
    selectMarker: (state, action: PayloadAction<number>) => {
      state.markers.map((e) => e.id == action.payload ? state.selectedMarker = e : null)
      state.zoomedMarkerCoordinates = state.selectedMarker.coordinates
    },
    editMarker: (state, action: PayloadAction<MarkerData>) => {
      state.selectedMarker = action.payload
    },
    saveEditedMarker: (state,) => {
      state.markers = state.markers.map((e) => e.id == state.selectedMarker.id ? e = state.selectedMarker : e)
      state.zoomedMarkerCoordinates = state.selectedMarker.coordinates
      const newState = {
        ...selectedMarkerInitialState,
        id: length + 1
      }
      state.selectedMarker = newState
    },
    newMarker: (state,) => {
      let length = state.markers.length
      const newState = {
        ...selectedMarkerInitialState,
        id: length + 1
      }
      state.selectedMarker = newState
    }
  }
});

export const { addMarker, selectMarker, editMarker, newMarker, saveEditedMarker } = markerSlice.actions;
export default markerSlice.reducer;