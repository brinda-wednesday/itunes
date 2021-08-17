/**
 *
 * ItunesCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar } from 'antd';
import styled from 'styled-components';
import { primarygrey } from '@app/themes/colors';

const { Meta } = Card;

const CustomCard = styled(Card)`
  && {
    margin: 1.25em 1.25em;
    width: 25em;
    border-radius: 1.25em;
    background-color: ${primarygrey};
    position: relative;
  }
`;
const Audio = styled.audio`
  && {
    width: 18em;
    margin: 1.25em;
  }
`;
const Source = styled.source`
  && {
    background-color: ${primarygrey};
  }
`;
const CustomAvatar = styled(Avatar)`
  && {
    width: 5em;
    height: 5em;
  }
`;
export function ItunesCard({ songTitle, imgSrc, songArtist, audioSrc, trackId }) {
  return (
    <CustomCard data-testid="itunes-card" key={trackId}>
      <Meta
        data-testid="song-name"
        avatar={<CustomAvatar data-testid="artist-img" src={imgSrc} />}
        title={songTitle}
        description={songArtist}
      />

      <Audio controls>
        <Source data-testid="audio-src" src={audioSrc} type="video/mp4" />
      </Audio>
    </CustomCard>
  );
}

ItunesCard.propTypes = {
  songTitle: PropTypes.string.isRequired,
  songArtist: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  audioSrc: PropTypes.string.isRequired,

  trackId: PropTypes.number.isRequired
};

export default ItunesCard;
