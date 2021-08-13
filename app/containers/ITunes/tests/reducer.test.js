// import produce from 'immer'
import { iTunesReducer, iTunesTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('ITunes reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(iTunesReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type FETCH_SONG is dispatched', () => {
    const songName = 'faded';
    const expectedResult = { ...state, songName };
    expect(
      iTunesReducer(state, {
        type: iTunesTypes.REQUEST_GET_ITUNES_SONGS,
        songName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and userLoading = false when FETCH_SONG_SUCCESS is dispatched', () => {
    const data = { name: 'faded' };
    const expectedResult = { ...state, songData: data };
    expect(
      iTunesReducer(state, {
        type: iTunesTypes.SUCCESS_GET_ITUNES_SONGS,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the userErrorMessage has some data and userLoading = false when FETCH_SONG_FAILURE is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, songError: error };
    expect(
      iTunesReducer(state, {
        type: iTunesTypes.FAILURE_GET_ITUNES_SONGS,
        error
      })
    ).toEqual(expectedResult);
  });
});
