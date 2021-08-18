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
import { testItunesData } from '@app/utils/testData';
import { BrowserRouter } from 'react-router-dom';

describe('<TrackDetailContainer /> container tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const data = testItunesData.results[0];
    const { baseElement } = renderProvider(
      <BrowserRouter>
        <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />
      </BrowserRouter>
    );
    expect(baseElement).toMatchSnapshot();
  });
});
