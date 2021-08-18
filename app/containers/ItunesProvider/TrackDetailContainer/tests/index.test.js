/**
 *
 * Tests for TrackDetailContainer
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import { TrackDetailContainerTest as TrackDetailContainer } from '../index';

describe('<TrackDetailContainer /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn()
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<TrackDetailContainer />);
    expect(baseElement).toMatchSnapshot();
  });
});
