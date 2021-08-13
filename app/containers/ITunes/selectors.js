import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';

/**
 * Direct selector to the iTunes state domain
 */

const selectITunesDomain = (state) => state.iTunes || initialState;

export const selectITunes = () => createSelector(selectITunesDomain, (substate) => substate);

export const selectSongData = () => createSelector(selectITunesDomain, (substate) => get(substate, 'songData', null));

export const selectSongError = () => createSelector(selectITunesDomain, (substate) => get(substate, 'songError', null));

export const selectSongName = () => createSelector(selectITunesDomain, (substate) => get(substate, 'songName', null));

export default selectITunes;
