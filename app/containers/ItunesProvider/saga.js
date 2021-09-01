import { put, call, select, takeLatest } from 'redux-saga/effects';
import { iTunesTypes, iTunesCreators } from './reducer';
import { getSongs } from '@services/itunesApi';
import { selectSongData } from './selectors';
// Individual exports for testing
const { REQUEST_GET_ITUNES_SONGS, REQUEST_GET_ITUNE_DETAIL } = iTunesTypes;
const { successGetItunesSongs, failureGetItunesSongs, successGetItuneDetail, failureGetItuneDetail } = iTunesCreators;

export function* getiTunesSongs(action) {
  const response = yield call(getSongs, action.songName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetItunesSongs(data));
  } else {
    yield put(failureGetItunesSongs(data));
  }
}

export function* getiTuneTrackDetail(action) {
  const state = yield select(selectSongData());
  const results = state.results;
  const response = results.filter((item) => item.trackId === action.trackDetail);
  if (response.length) {
    yield put(successGetItuneDetail(response[0]));
  } else {
    const response = yield call(getSongs, action.trackDetail);
    const { data, ok } = response;
    if (ok) {
      yield put(successGetItuneDetail(data.results[0]));
    } else {
      yield put(failureGetItuneDetail(data));
    }
  }
}

export default function* iTunesSaga() {
  yield takeLatest(REQUEST_GET_ITUNES_SONGS, getiTunesSongs);
  yield takeLatest(REQUEST_GET_ITUNE_DETAIL, getiTuneTrackDetail);
}
