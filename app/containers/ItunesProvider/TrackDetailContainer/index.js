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
import { Card, Typography } from 'antd';

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
    background-color: ${primarygrey};
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

export function TrackDetailContainer({ trackData = {}, dispatchTrackDetail }) {
  const params = useParams();

  useEffect(() => {
    if (params.trackId) {
      dispatchTrackDetail(params.trackId);
    }
  }, []);

  return (
    <If condition={!isEmpty(trackData)}>
      <Container data-testid="container">
        <CustomCard data-testid="track-card" cover={<Image alt="example" src={trackData.artworkUrl100} />}>
          <CustomTitle level={5}>{trackData.kind}</CustomTitle>
          <Meta title={trackData.trackName} description={trackData.artistName} />
          <Audio controls>
            <Source data-testid="audio-src" src={trackData.previewUrl} />
          </Audio>
          <CustomText> Collection Name : {trackData.collectionName}</CustomText>
          <CustomText data-testid="genre">Genre : {trackData.primaryGenreName}</CustomText>
          <CustomText data-testid="price" italic type="success">
            Price : ${trackData.trackPrice}
          </CustomText>
        </CustomCard>
      </Container>
    </If>
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
