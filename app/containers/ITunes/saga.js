import { put, call, takeLatest } from 'redux-saga/effects';
import { iTunesTypes, iTunesCreators } from './reducer';
import { getSongs } from '@services/itunesApi';
// Individual exports for testing
const { REQUEST_GET_ITUNES_SONGS } = iTunesTypes;
const { successGetItunesSongs, failureGetItunesSongs } = iTunesCreators;

export function* getiTunesSongs(action) {
  const response = yield call(getSongs, action.songName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetItunesSongs(data));
  } else {
    yield put(failureGetItunesSongs(data));
  }
}

export default function* iTunesSaga() {
  yield takeLatest(REQUEST_GET_ITUNES_SONGS, getiTunesSongs);
}
