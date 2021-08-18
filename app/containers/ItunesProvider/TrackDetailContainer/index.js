/**
 *
 * TrackDetailContainer
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as T } from 'react-intl';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import makeSelectTrackDetailContainer from '../selectors';

export function TrackDetailContainer() {
  return (
    <div>
      <T id={'TrackDetailContainer'} />
    </div>
  );
}

TrackDetailContainer.propTypes = {};

const mapStateToProps = createStructuredSelector({
  trackDetailContainer: makeSelectTrackDetailContainer()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(TrackDetailContainer);

export const TrackDetailContainerTest = compose(injectIntl)(TrackDetailContainer);
