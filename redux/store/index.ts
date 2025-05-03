import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mapReducer from "@/redux/slices/mapSlice";

const rootReducer = combineReducers({
  map: mapReducer,
  //add all your reducers here
});

export const store = configureStore({
  reducer: rootReducer,
  //Change serializableCheck to "false" if you want to remove console errors about non-serializable values kept in state.
  //That error can happen a lot if you're trying to store Feature or Layer class objects from OpenLayers in state (that's
  // bad practice and not advisable to do).
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: true,
      serializableCheck: true,
      actionCreatorCheck: true,
    }),
});

// Infer the 'RootState' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
