/**
 *
 * ITunes
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as T } from 'react-intl';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Input } from 'antd';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { selectITunes, selectSongData, selectSongError, selectSongName } from './selectors';

import { iTunesCreators } from './reducer';
import iTunesSaga from './saga';
import { injectSaga } from 'redux-injectors';

const { Search } = Input;

export function ITunes({ songData = [], songError = null, songName, dispatchSongs, dispatchClearSongs }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {

    const loaded = get(songData, 'results', null) || songError;
    console.log(loaded);
    if (loading && loaded) {
      setLoading(false);
    }
  }, [songData]);

  useEffect(() => {
    if (songName && !songData?.results?.length) {
      dispatchSongs(songName);
      setLoading(true);
    }
  }, []);

  const handleOnChange = (sName) => {
    if (!isEmpty(sName)) {
      dispatchSongs(sName);
      setLoading(true);
    } else {
      dispatchClearSongs();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  return (
    <div>
      <T id={'ITunes'} />
      <Search
        data-testid="search-bar"
        defaultValue={songName}
        type="text"
        onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
      />
    </div>
  );
}

ITunes.propTypes = {
  dispatchSongs: PropTypes.func,
  dispatchClearSongs: PropTypes.func,
  intl: PropTypes.object,
  songData: PropTypes.object,
  songError: PropTypes.object,
  songName: PropTypes.string,
  history: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  iTunes: selectITunes(),
  songData: selectSongData(),
  songError: selectSongError(),
  songName: selectSongName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetItunesSongs, clearItunesSongs } = iTunesCreators;
  return {
    dispatchSongs: (songName) => dispatch(requestGetItunesSongs(songName)),
    dispatchClearSongs: () => dispatch(clearItunesSongs())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'iTunes', saga: iTunesSaga }))(ITunes);

export const ITunesTest = compose(injectIntl)(ITunes);
