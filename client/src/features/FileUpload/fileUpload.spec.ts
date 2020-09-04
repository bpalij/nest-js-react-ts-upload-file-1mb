import fileUploadReducer, { initialState, FileUploadState, start, progress, error, abort, load } from './fileUploadSlice';
import { UPLOAD_STATUS_ABORT, UPLOAD_STATUS_ERROR, UPLOAD_STATUS_LOAD} from './constants';

const progressState:FileUploadState = {
  status: '',
  showStatusString: true,
  percents: 23,
  showPercentText: true,
}

const loadState:FileUploadState = {
  showPercentText: false,
  percents: 0,
  status: UPLOAD_STATUS_LOAD,
  showStatusString: true,
}

const errorState:FileUploadState = {
  showPercentText: false,
  percents: 0,
  status: UPLOAD_STATUS_ERROR,
  showStatusString: true,
}

const abortState:FileUploadState = {
  showPercentText: false,
  percents: 0,
  status: UPLOAD_STATUS_ABORT,
  showStatusString: true,
}

const startedState: FileUploadState = {
  ...initialState,
  showPercentText: true,
}

describe('file upload reducer', () => {
  it('start', () => {
    expect(fileUploadReducer(initialState, { type: start.type })).toEqual(startedState);
    expect(fileUploadReducer(loadState, { type: start.type })).toEqual(startedState);
    expect(fileUploadReducer(errorState, { type: start.type })).toEqual(startedState);
    expect(fileUploadReducer(abortState, { type: start.type })).toEqual(startedState);
  })

  it('progress', () => {
    expect(fileUploadReducer(progressState, { type: progress.type, payload: 53 })).toEqual({ ...progressState, percents: 53 });
  })

  it('load', () => {
    expect(fileUploadReducer(progressState, { type: load.type })).toEqual(loadState);
  })

  it('error', () => {
    expect(fileUploadReducer(progressState, { type: error.type })).toEqual(errorState);
  })

  it('abort', () => {
    expect(fileUploadReducer(progressState, { type: abort.type })).toEqual(abortState);
  })
})