/**
 *
 * CustomCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import T from '@components/T';
import { Card } from 'antd';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${(props) => props.maxWidth ?? 900}px;
    color: grey;
  }
`;

export function CustomCard({ name, stargazersCount, fullName }) {
  return (
    <StyledCard data-testid="custom-card">
      <T id="repository_name" data-testid="repo-name" values={{ name: name }} />
      <T id="repository_full_name" data-testid="full-name" values={{ fullName: fullName }} />
      <T id="repository_stars" data-testid="stargazer-count" values={{ stars: stargazersCount }} />
    </StyledCard>
  );
}

CustomCard.propTypes = {
  name: PropTypes.string,
  stargazersCount: PropTypes.number,
  fullName: PropTypes.string
};

export default CustomCard;
