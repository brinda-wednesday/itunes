/**
 *
 * TrackDetailContainer
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { selectTrackData, selectTrackDetail, selectTrackError } from '../selectors';
import { useParams } from 'react-router-dom';
import { iTunesCreators } from '../reducer';
import { isEmpty } from 'lodash';
import { injectSaga } from 'redux-injectors';
import iTunesSaga from '../saga';
import styled from 'styled-components';
import { primarygrey } from '@app/themes/colors';
import If from '@app/components/If/index';
import { Card, Typography, Button, Tooltip, Popover } from 'antd';
import { T } from '@app/components/T/index';

import { PlayCircleOutlined, PauseCircleOutlined, StepForwardOutlined, CaretDownOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
const { Meta } = Card;
const Container = styled.div`
  && {
    width: 100%;
    margin: 0 auto;
    padding: 1.25em;
    display: flex;
    justify-content: center;
  }
`;
const Image = styled.img`
  && {
    width: 20em;
    height: 20em;
    border-radius: 2em;
  }
`;
const CustomCard = styled(Card)`
  && {
    width: 80em;
    border-radius: 2em;
    display: flex;
    justify-content: center;
    background-color: ${primarygrey};
    padding: 3em;
  }
`;
const Audio = styled.audio`
  && {
    width: 18em;
    margin: 1.25em;
    display: block;
  }
`;
const Source = styled.source`
  && {
    background-color: ${primarygrey};
  }
`;
const CustomText = styled(Text)`
  && {
    display: block;
  }
`;
const CustomTitle = styled(Title)`
  && {
    color: blue;
  }
`;
const CustomButton = styled(Button)`
  && {
    background-color: black;
    color: aqua;
    margin: 0.5em;
  }
`;

export function TrackDetailContainer({ trackData = {}, dispatchTrackDetail }) {
  const params = useParams();
  const audioRef = React.useRef();
  const [trackState, setTrackState] = React.useState('');
  useEffect(() => {
    if (params.trackId) {
      dispatchTrackDetail(params.trackId);
    }
  }, []);

  const handlePlay = () => {
    audioRef.current.play();
    setTrackState('Track Playing');
  };
  const handlePause = () => {
    audioRef.current.pause();
    setTrackState('Track Paused');
  };
  const handleIncreaseFiveSec = () => {
    audioRef.current.currentTime += 5;
    setTrackState('Track Forwarded 5s');
  };
  const handlePlaybackrate = () => {
    audioRef.current.playbackRate = 0.5;
    setTrackState('Track rate halved');
  };
  const content = (
    <>
      <CustomText> Collection Name : {trackData.collectionName}</CustomText>
      <CustomText data-testid="genre">Genre : {trackData.primaryGenreName}</CustomText>
      <CustomText data-testid="price" italic type="success">
        Price : ${trackData.trackPrice}
      </CustomText>
    </>
  );

  return (
    <>
      <If condition={!isEmpty(trackData)}>
        <Container data-testid="container">
          <CustomCard data-testid="track-card" cover={<Image alt="example" src={trackData.artworkUrl100} />}>
            <CustomTitle level={5}>{trackData.kind}</CustomTitle>
            <Meta title={trackData.trackName} description={trackData.artistName} />
            <Audio controls ref={audioRef}>
              <Source data-testid="audio-src" src={trackData.previewUrl} />
            </Audio>
            <Tooltip title="play">
              <CustomButton
                data-testid="play-btn"
                shape="circle"
                size="large"
                icon={<PlayCircleOutlined />}
                onClick={handlePlay}
              />
            </Tooltip>
            <Tooltip title="pause">
              <CustomButton
                type="primary"
                shape="circle"
                size="large"
                data-testid="pause-btn"
                icon={<PauseCircleOutlined />}
                onClick={handlePause}
              />
            </Tooltip>
            <Tooltip title="Forward">
              <CustomButton
                type="primary"
                shape="circle"
                size="large"
                data-testid="forward-btn"
                icon={<StepForwardOutlined />}
                onClick={handleIncreaseFiveSec}
              />
            </Tooltip>
            <Tooltip title="Playbackrate">
              <CustomButton
                type="primary"
                shape="circle"
                size="large"
                data-testid="playback-btn"
                icon={<CaretDownOutlined />}
                onClick={handlePlaybackrate}
              />
            </Tooltip>

            <Popover content={content}>
              <CustomButton>More</CustomButton>
            </Popover>
            <CustomText>{trackState}</CustomText>
          </CustomCard>
        </Container>
      </If>
      <If condition={isEmpty(trackData)}>
        <Container>
          <T id="not-found" data-testid="not-found" />
        </Container>
      </If>
    </>
  );
}

TrackDetailContainer.propTypes = {
  dispatchTrackDetail: PropTypes.func,
  trackDetail: PropTypes.string,
  trackData: PropTypes.object,
  trackError: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  trackDetail: selectTrackDetail(),
  trackData: selectTrackData(),
  trackError: selectTrackError()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetItuneDetail } = iTunesCreators;
  return {
    dispatchTrackDetail: (trackDetail) => dispatch(requestGetItuneDetail(trackDetail))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo, injectSaga({ key: 'iTunes', saga: iTunesSaga }))(TrackDetailContainer);

export const TrackDetailContainerTest = compose(injectIntl)(TrackDetailContainer);
