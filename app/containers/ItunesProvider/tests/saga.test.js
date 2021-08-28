/**
 * Test iTunes sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getSongs } from '@app/services/itunesApi';
import { apiResponseGenerator } from '@app/utils/testUtils';
import iTunesSaga, { getiTunesSongs, getiTuneTrackDetail } from '../saga';
import { iTunesTypes } from '../reducer';
import { testItunesData } from '@app/utils/testData';

describe('ITunes saga tests', () => {
  const generator = iTunesSaga();
  let songName = 'faded';
  let trackDetail = testItunesData.results[0].trackId;
  let getiTunesSongsGenerator = getiTunesSongs({ songName });
  let getiTunesTrackGenerator = getiTuneTrackDetail({ trackDetail });

  beforeEach(() => {
    songName = 'faded';
    trackDetail = testItunesData.results[0].trackId;
  });

  it('should start task to watch for REQUEST_GET_ITUNES_SONGS action', () => {
    expect(generator.next().value).toEqual(takeLatest(iTunesTypes.REQUEST_GET_ITUNES_SONGS, getiTunesSongs));
  });

  it('should ensure that the action FAILURE_GET_ITUNES_SONGS is dispatched when the api call fails', () => {
    const res = getiTunesSongsGenerator.next().value;
    expect(res).toEqual(call(getSongs, songName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching song informations.'
    };
    expect(getiTunesSongsGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: iTunesTypes.FAILURE_GET_ITUNES_SONGS,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_ITUNES_SONGS is dispatched when the api call succeeds', () => {
    getiTunesSongsGenerator = getiTunesSongs({ songName });
    const res = getiTunesSongsGenerator.next().value;
    expect(res).toEqual(call(getSongs, songName));
    const songResponse = {
      resultCount: 1,
      results: [{ songName: songName }]
    };
    expect(getiTunesSongsGenerator.next(apiResponseGenerator(true, songResponse)).value).toEqual(
      put({
        type: iTunesTypes.SUCCESS_GET_ITUNES_SONGS,
        data: songResponse
      })
    );
  });
  it('should start REQUEST_GET_ITUNE_DETAIL action', () => {
    expect(generator.next().value).toEqual(takeLatest(iTunesTypes.REQUEST_GET_ITUNE_DETAIL, getiTuneTrackDetail));
  });

  it('should ensure that the action FAILURE_GET_ITUNE_DETAIL is dispatched when the api call fails', () => {
    getiTunesTrackGenerator = getiTuneTrackDetail({ trackDetail });
    getiTunesTrackGenerator.next({ results: [] });
    expect(getiTunesTrackGenerator.next({ results: [] }).value).toEqual(call(getSongs, trackDetail));
    const trackDetailError = {
      trackDetailError: 'There was an error while fetching song informations.'
    };
    expect(getiTunesTrackGenerator.next(apiResponseGenerator(false, trackDetailError)).value).toEqual(
      put({
        type: iTunesTypes.FAILURE_GET_ITUNE_DETAIL,
        trackDetailError: trackDetailError
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_ITUNE_DETAIL is dispatched when the track detail in store SUCCEEDS', () => {
    getiTunesTrackGenerator = getiTuneTrackDetail({ trackDetail });
    getiTunesTrackGenerator.next({ results: testItunesData.results });
    expect(getiTunesTrackGenerator.next({ results: testItunesData.results }).value).toEqual(
      put({
        type: iTunesTypes.SUCCESS_GET_ITUNE_DETAIL,
        trackData: testItunesData.results[0]
      })
    );
  });
  it('should ensure that the action SUCCESS_GET_ITUNE_DETAIL is dispatched when the track detail is not present in store and api call  SUCCEEDS', () => {
    getiTunesTrackGenerator = getiTuneTrackDetail({ trackDetail });
    getiTunesTrackGenerator.next({ results: [] });
    expect(getiTunesTrackGenerator.next({ results: [] }).value).toEqual(call(getSongs, trackDetail));
    expect(getiTunesTrackGenerator.next(apiResponseGenerator(true, testItunesData)).value).toEqual(
      put({
        type: iTunesTypes.SUCCESS_GET_ITUNE_DETAIL,
        trackData: testItunesData.results[0]
      })
    );
  });
});
