/*
 *
 * ITunes reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';
export const initialState = {
  songName: null,
  songData: [],
  songError: null,
  trackDetail: null,
  trackData: {},
  trackDetailError: null
};

export const { Types: iTunesTypes, Creators: iTunesCreators } = createActions({
  requestGetItunesSongs: ['songName'],
  successGetItunesSongs: ['data'],
  failureGetItunesSongs: ['error'],
  requestGetItuneDetail: ['trackDetail'],
  successGetItuneDetail: ['trackData'],
  failureGetItuneDetail: ['trackDetailError'],
  clearItunesSongs: []
});

/* eslint-disable default-case, no-param-reassign */
export const iTunesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case iTunesTypes.REQUEST_GET_ITUNES_SONGS:
        draft.songName = action.songName;
        break;
      case iTunesTypes.SUCCESS_GET_ITUNES_SONGS:
        draft.songData = action.data;
        break;
      case iTunesTypes.FAILURE_GET_ITUNES_SONGS:
        draft.songError = get(action.error, 'message', 'something_went_wrong');
        break;
      case iTunesTypes.REQUEST_GET_ITUNE_DETAIL:
        draft.trackDetail = action.trackDetail;
        break;
      case iTunesTypes.SUCCESS_GET_ITUNE_DETAIL:
        draft.trackData = action.trackData;
        break;
      case iTunesTypes.FAILURE_GET_ITUNE_DETAIL:
        draft.trackDetailError = action.trackDetailError;
        break;
      case iTunesTypes.CLEAR_ITUNES_SONGS:
        return initialState;
    }
  });

export default iTunesReducer;
