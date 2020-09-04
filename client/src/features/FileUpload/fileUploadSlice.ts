import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UPLOAD_STATUS_ABORT, UPLOAD_STATUS_ERROR, UPLOAD_STATUS_LOAD} from './constants';
import { RootState, AppThunk } from '../../app/store';
import { ChangeEvent } from 'react';
import countPercents from './countPercents';

type uploadStatus = typeof UPLOAD_STATUS_LOAD | typeof UPLOAD_STATUS_ERROR | typeof UPLOAD_STATUS_ABORT | '';

export interface FileUploadState {
  status: uploadStatus;
  showStatusString: boolean;
  percents: number;
  showPercentText: boolean;
}

export const initialState: FileUploadState = {
  status: '',
  showStatusString: false,
  percents: 0,
  showPercentText: false,
};

export const fileUploadSlice = createSlice({
  name: 'fileUpload',
  initialState,
  reducers: {
    start: state => {
      state.showPercentText = true;
      state.percents = 0;
      state.showStatusString = false;
      state.status = '';
    },
    progress: (state, action: PayloadAction<number>) => {
      state.percents = action.payload;
    },
    error: state => {
      state.showPercentText = false;
      state.percents = 0;
      state.status = UPLOAD_STATUS_ERROR;
      state.showStatusString = true;
    },
    abort: state => {
      state.showPercentText = false;
      state.percents = 0;
      state.status = UPLOAD_STATUS_ABORT;
      state.showStatusString = true;
    },
    load: state => {
      state.showPercentText = false;
      state.percents = 0;
      state.status = UPLOAD_STATUS_LOAD;
      state.showStatusString = true;
    }
  },
});

export const { start, progress, error, abort, load } = fileUploadSlice.actions;

export const handleUpload = (event: ChangeEvent<HTMLInputElement>): AppThunk => dispatch => {
  if(event.target.files) {
    const files = event.target.files;
    const form = new FormData();
    for (let i = 0; i < files.length; i++){
      form.append("files", files[i]);
    }  
    const ajax = new XMLHttpRequest();
    ajax.upload.addEventListener("progress", (event) => {
      dispatch(progress(countPercents(event)));
    }, false);
    ajax.addEventListener("load", () => {
      dispatch(load());
    }, false);
    ajax.addEventListener("error", () => {
      dispatch(error());
    }, false);
    ajax.addEventListener("abort", () => {
      dispatch(abort());
    }, false);
    dispatch(start());
    ajax.open("POST", "http://127.0.0.1:5000/files");
    ajax.send(form);
  }
};

export const selectFileUploadStatus = (state: RootState) => state.fileUpload.status;
export const selectFileUploadShowStatus = (state: RootState) => state.fileUpload.showStatusString;
export const selectFileUploadPercents = (state: RootState) => state.fileUpload.percents;
export const selectFileUploadShowPercents = (state: RootState) => state.fileUpload.showPercentText;

export default fileUploadSlice.reducer;