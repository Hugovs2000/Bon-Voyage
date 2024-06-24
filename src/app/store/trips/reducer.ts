import { isDevMode } from '@angular/core';
import { createReducer, MetaReducer, on } from '@ngrx/store';
import { Trip } from '../../models/trips';
import {
  createNewTrip,
  createNewTripComplete,
  deleteTrip,
  deleteTripComplete,
  getAllTrips,
  getAllTripsComplete,
  setSelectedTripId,
  updateTrip,
  updateTripComplete,
} from './actions';

export const tripsFeatureKey = 'Trips';

export interface TripState {
  trips: Trip[];
  isLoading: boolean;
  selectedTripId?: string;
}

const initialState: TripState = {
  trips: [],
  isLoading: false,
};

export const tripsReducers = createReducer(
  initialState,
  on(getAllTrips, state => ({
    ...state,
    isLoading: true,
  })),
  on(getAllTripsComplete, (state, { trips }) => ({
    ...state,
    isLoading: false,
    trips,
  })),
  on(createNewTrip, state => ({
    ...state,
    isLoading: true,
  })),
  on(createNewTripComplete, (state, { trip }) => ({
    ...state,
    isLoading: false,
    trips: [...state.trips, trip],
  })),
  on(updateTrip, state => ({
    ...state,
    isLoading: true,
  })),
  on(updateTripComplete, (state, { trip }) => ({
    ...state,
    isLoading: false,
    trips: [...state.trips, trip],
  })),
  on(deleteTrip, state => ({
    ...state,
    isLoading: true,
  })),
  on(deleteTripComplete, (state, { tripId }) => ({
    ...state,
    isLoading: false,
    trips: state.trips.filter(t => t.docId !== tripId),
  })),

  on(setSelectedTripId, (state, { tripId }) => ({
    ...state,
    selectedTripId: tripId,
  }))
);

export const metaReducers: MetaReducer<Trip>[] = isDevMode() ? [] : [];
