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
import styled from 'styled-components';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';

import { selectITunes, selectSongData, selectSongError, selectSongName } from './selectors';

import { iTunesCreators } from './reducer';
import iTunesSaga from './saga';
import { injectSaga } from 'redux-injectors';
import ItunesCard from '@app/components/ItunesCard/index';

const { Search } = Input;

const GridLayout = styled.div`
  && {
    margin: 1.25em 0;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Container = styled.div`
  && {
    width: 100%;
    margin: 0 auto;
    padding: 1.25em;
  }
`;

export function ITunes({ songData = [], songError = null, songName, dispatchSongs, dispatchClearSongs }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loaded = get(songData, 'results', null) || songError;

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

  const renderSongList = () => {
    const items = get(songData, 'results', []);

    return (
      (items.length !== 0 || loading) && (
        <GridLayout>
          {items.map((item, index) => (
            <ItunesCard
              key={index}
              songTitle={item.trackName}
              imgSrc={item.artworkUrl100}
              songArtist={item.artistName}
              audioSrc={item.previewUrl}
              trackId={item.trackId}
            ></ItunesCard>
          ))}
        </GridLayout>
      )
    );
  };
  return (
    <Container>
      <T id={'ITunes'} />
      <Search
        data-testid="search-bar"
        defaultValue={songName}
        type="text"
        onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
      />
      {renderSongList()}
    </Container>
  );
}

ITunes.propTypes = {
  dispatchSongs: PropTypes.func,
  dispatchClearSongs: PropTypes.func,
  intl: PropTypes.object,
  songData: PropTypes.object,
  songError: PropTypes.object,
  songName: PropTypes.string
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
