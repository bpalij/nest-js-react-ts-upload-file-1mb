import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import fileUploadReduce from '../features/FileUpload/fileUploadSlice';

export const store = configureStore({
  reducer: {
    fileUpload: fileUploadReduce,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
