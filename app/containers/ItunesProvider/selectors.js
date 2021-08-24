import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';

/**
 * Direct selector to the iTunes state domain
 */

const selectITunesDomain = (state) => state.iTunes || initialState;

export const selectITunes = () => createSelector(selectITunesDomain, (substate) => substate);

export const selectSongData = () => createSelector(selectITunesDomain, (substate) => get(substate, 'songData'));

export const selectSongError = () => createSelector(selectITunesDomain, (substate) => get(substate, 'songError'));

export const selectSongName = () => createSelector(selectITunesDomain, (substate) => get(substate, 'songName'));

export const selectTrackDetail = () => createSelector(selectITunesDomain, (substate) => get(substate, 'trackDetail'));

export const selectTrackData = () => createSelector(selectITunesDomain, (substate) => get(substate, 'trackData'));

export const selectTrackError = () =>
  createSelector(selectITunesDomain, (substate) => get(substate, 'trackDetailError'));

export default selectITunes;
