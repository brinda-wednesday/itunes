/**
 *
 * ITunes
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Input } from 'antd';
import styled from 'styled-components';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';

import {
  selectITunes,
  selectSongData,
  selectSongError,
  selectSongName,
  selectTrackData,
  selectTrackDetail,
  selectTrackError
} from '../selectors';

import { iTunesCreators } from '../reducer';
import iTunesSaga from '../saga';
import { injectSaga } from 'redux-injectors';
import ItunesCard from '@app/components/ItunesCard/index';
import If from '@app/components/If/index';
import { Link } from 'react-router-dom';
import { T } from '@components/T';

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

export function iTunes({
  songData = {},
  songError = null,
  songName,
  dispatchSongs,
  dispatchClearSongs,
  trackData = {},
  trackDetail = null
}) {
  const [loading, setLoading] = useState(false);
  const items = get(songData, 'results', []);

  const handleOnChange = (sName) => {
    if (!isEmpty(sName)) {
      dispatchSongs(sName);
      setLoading(true);
    } else {
      dispatchClearSongs();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  useEffect(() => {
    const loaded = get(songData, 'results', songError);
    if (loading && loaded) {
      setLoading(false);
    }
  }, [songData, songError]);

  useEffect(() => {
    if (songName && !songData?.results?.length) {
      dispatchSongs(songName);
      setLoading(true);
    }
  }, []);

  return (
    <Container>
      <T id={'ITunes'} />
      <Search
        data-testid="search-bar"
        defaultValue={songName}
        type="text"
        onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
      />
      <If condition={items.length !== 0 || loading}>
        <GridLayout data-testid="grid">
          {items.map((item, index) => (
            <Link key={index} to={`/${item.trackId}`}>
              <ItunesCard
                data-testid="itunes-card"
                songTitle={item.trackName}
                imgSrc={item.artworkUrl100}
                songArtist={item.artistName}
                audioSrc={item.previewUrl}
                trackId={item.trackId}
              ></ItunesCard>
            </Link>
          ))}
        </GridLayout>
      </If>
      <If condition={songError && !loading}>
        <T id={songError} />
      </If>
    </Container>
  );
}

iTunes.propTypes = {
  dispatchSongs: PropTypes.func,
  dispatchClearSongs: PropTypes.func,
  intl: PropTypes.object,
  songError: PropTypes.object,
  songName: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  iTunes: selectITunes(),
  songData: selectSongData(),
  songError: selectSongError(),
  songName: selectSongName(),
  trackDetail: selectTrackDetail(),
  trackData: selectTrackData(),
  trackError: selectTrackError()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetItunesSongs, clearItunesSongs } = iTunesCreators;
  return {
    dispatchSongs: (songName) => dispatch(requestGetItunesSongs(songName)),
    dispatchClearSongs: () => dispatch(clearItunesSongs())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'iTunes', saga: iTunesSaga }))(iTunes);

export const ITunesTest = compose(injectIntl)(iTunes);
