import { selectITunes, selectSongName, selectSongError, selectSongData } from '../selectors';

describe('ITunes selector tests', () => {
  let mockedState;
  let songName;
  let songData;
  let songError;

  beforeEach(() => {
    songName = 'faded';
    songData = { totalCount: 1, results: [{ songName }] };
    songError = 'There was some error while fetching the songs details';
    mockedState = {
      iTunes: {
        songName,
        songData,
        songError
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
});
