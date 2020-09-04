import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UPLOAD_STATUS_ABORT, UPLOAD_STATUS_ERROR, UPLOAD_STATUS_LOAD } from './constants';
import {
  handleUpload,
  selectFileUploadStatus,
  selectFileUploadShowStatus,
  selectFileUploadPercents,
  selectFileUploadShowPercents,
} from './fileUploadSlice';
import styles from './FileUpload.module.css';
import classNames from 'classnames';

export function FileUploader() {

  const fileUploadStatus = useSelector(selectFileUploadStatus);
  const fileUploadShowStatus = useSelector(selectFileUploadShowStatus);
  const fileUploadPercents = useSelector(selectFileUploadPercents);
  const fileUploadShowPercents = useSelector(selectFileUploadShowPercents);
  const dispatch = useDispatch();

  return (
    <div className={classNames(styles.background, {
      [styles['background-green-color']]: fileUploadStatus === UPLOAD_STATUS_LOAD,
      [styles['background-red-color']]: fileUploadStatus === UPLOAD_STATUS_ERROR || fileUploadStatus === UPLOAD_STATUS_ABORT,
      [styles['background-default-color']]: !(fileUploadStatus === UPLOAD_STATUS_LOAD || fileUploadStatus === UPLOAD_STATUS_ERROR || fileUploadStatus === UPLOAD_STATUS_ABORT),
      })
    }>

        <form className={styles.form} encType="multipart/form-data" method="post">
          <input type="file" name="file1" onChange={(event) => dispatch(handleUpload(event))} multiple /><br/>
          <progress className={styles['progress-bar']} value={fileUploadPercents} max="100"></progress>
          <p>{fileUploadShowPercents && <>{fileUploadPercents}%</>}</p>
          <br/>
          <p>{fileUploadShowStatus && <>Status: {fileUploadStatus}</>}</p>
          <br/>
          
        </form>

    </div>
  );
}
