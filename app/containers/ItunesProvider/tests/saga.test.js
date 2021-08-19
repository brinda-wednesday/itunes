/**
 * Test iTunes sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getSongs } from '@app/services/itunesApi';
import { apiResponseGenerator } from '@app/utils/testUtils';
import iTunesSaga, { getiTunesSongs, getiTuneTrackDetail } from '../saga';
import { iTunesTypes } from '../reducer';
// import { testItunesData } from '@app/utils/testData';
// import { selectSongData } from '../selectors';

describe('ITunes saga tests', () => {
  const generator = iTunesSaga();
  const songName = 'faded';
  let getiTunesSongsGenerator = getiTunesSongs({ songName });

  // const data = testItunesData.results[0];
  // const trackId = data.trackId;
  // let getiTunesTrackDetailGenerator = getiTuneTrackDetail({ trackId });
  // let state;
  // beforeEach(() => {
  //   state = getSongs('faded');
  // });

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
  it('should start REQUEST_GET_ITUNE_DETAIL action', () => {
    expect(generator.next().value).toEqual(takeLatest(iTunesTypes.REQUEST_GET_ITUNE_DETAIL, getiTuneTrackDetail));
  });

  // it('should call SUCCESS_GET_ITUNE_DETAIL when track with requested track Id is present in store ',()=>{

  // getiTunesTrackDetailGenerator = getiTuneTrackDetail({trackId});
  // const res = getiTunesTrackDetailGenerator.next().value;

  //  const stateres  = () => select(selectSongData());
  //  console.log(state);

  //  const results = state.results;
  //  const response = results.filter((item) => item.trackId == trackId);
  //  expect(res).toEqual(select(selectSongData()));

  // })
});
