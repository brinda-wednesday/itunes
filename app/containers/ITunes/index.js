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
import { Card, Skeleton, Input, Avatar } from 'antd';
import styled from 'styled-components';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';

import { selectITunes, selectSongData, selectSongError, selectSongName } from './selectors';

import { iTunesCreators } from './reducer';
import iTunesSaga from './saga';
import { injectSaga } from 'redux-injectors';

const { Search } = Input;
const { Meta } = Card;

const SongsContainer = styled.div`
  && {
    margin: 20px 0;
    max-width: 1000px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;
const ItunesCard = styled(Card)`
  && {
    margin: 10px 10px;
    width: 400px;
    border-radius: 20px;
    background-color: #e5e7eb;
    position: relative;
  }
`;
const Container = styled.div`
  && {
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
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
        <SongsContainer>
          {items.map((item, index) => (
            <ItunesCard key={index}>
              <Skeleton loading={loading} active>
                <Meta
                  avatar={<Avatar src={item.artworkUrl100} style={{ width: '75px', height: '75px' }} />}
                  title={item.trackName}
                  description={item.artistName}
                />

                <audio controls style={{ width: '250px' }}>
                  <source src={item.previewUrl} type="video/mp4" />
                </audio>
                <T id={'genre'} values={{ genre: item.primaryGenreName }} />
              </Skeleton>
            </ItunesCard>
          ))}
        </SongsContainer>
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
