/**
 * Test iTunes sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getSongs } from '@app/services/itunesApi';
import { apiResponseGenerator } from '@app/utils/testUtils';
import iTunesSaga, { getiTunesSongs } from '../saga';
import { iTunesTypes } from '../reducer';

describe('ITunes saga tests', () => {
  const generator = iTunesSaga();
  const songName = 'faded';
  let getiTunesSongsGenerator = getiTunesSongs({ songName });

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
      result: [{ songName: songName }]
    };
    expect(getiTunesSongsGenerator.next(apiResponseGenerator(true, songResponse)).value).toEqual(
      put({
        type: iTunesTypes.SUCCESS_GET_ITUNES_SONGS,
        data: songResponse
      })
    );
  });
});
