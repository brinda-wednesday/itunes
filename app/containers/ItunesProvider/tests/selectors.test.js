import { testItunesData } from '@app/utils/testData';
import {
  selectITunes,
  selectSongName,
  selectSongError,
  selectSongData,
  selectTrackDetail,
  selectTrackData,
  selectTrackError
} from '../selectors';

describe('ITunes selector tests', () => {
  let mockedState;
  let songName;
  let songData;
  let songError;
  let trackData;
  let trackDetail;
  let trackDetailError;

  beforeEach(() => {
    songName = 'faded';
    songData = { resultCount: 1, results: [{ songName }] };
    songError = 'There was some error while fetching the songs details';
    trackDetail = testItunesData.results[0].trackId;
    trackData = testItunesData.results[0];
    trackDetailError = 'There was some error while fetching track detail';
    mockedState = {
      iTunes: {
        songName,
        songData,
        songError,
        trackData,
        trackDetail,
        trackDetailError
      }
    };
  });

  it('should select the iTunes state', () => {
    const iTunesSelector = selectITunes();
    expect(iTunesSelector(mockedState)).toEqual(mockedState.iTunes);
  });
  it('should select the songName', () => {
    const songSelector = selectSongName();
    expect(songSelector(mockedState)).toEqual(songName);
  });

  it('should select songData', () => {
    const songDataSelector = selectSongData();
    expect(songDataSelector(mockedState)).toEqual(songData);
  });

  it('should select the songError', () => {
    const songErrorSelector = selectSongError();
    expect(songErrorSelector(mockedState)).toEqual(songError);
  });

  it('should select the trackDetail', () => {
    const trackDetailSelector = selectTrackDetail();
    expect(trackDetailSelector(mockedState)).toEqual(trackDetail);
  });
  it('should select the trackData', () => {
    const trackDataSelector = selectTrackData();
    expect(trackDataSelector(mockedState)).toEqual(trackData);
  });
  it('should select the trackDetailError', () => {
    const trackDetailErrorSelector = selectTrackError();
    expect(trackDetailErrorSelector(mockedState)).toEqual(trackDetailError);
  });
});
