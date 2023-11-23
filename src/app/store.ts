import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import pageStateReducer from '../reducers/pageState/pageStateSlice'
import NotesReducer from '../reducers/notes/noteSlice';

export const store = configureStore({
  reducer: {
    pageState: pageStateReducer,
    notes: NotesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
