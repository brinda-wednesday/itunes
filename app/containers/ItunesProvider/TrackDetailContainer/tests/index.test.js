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
  const data = testItunesData.results[0];
  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(
      <BrowserRouter>
        <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />
      </BrowserRouter>
    );
    expect(baseElement).toMatchSnapshot();
  });
  it('should render audio src', () => {
    const { getByTestId } = renderProvider(
      <BrowserRouter>
        <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />
      </BrowserRouter>
    );
    expect(getByTestId('audio-src').src).toBe(data.previewUrl);
  });
  it('should render track price', () => {
    const price = 'Price : $' + data.trackPrice;
    const { getByTestId } = renderProvider(
      <BrowserRouter>
        <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />
      </BrowserRouter>
    );
    expect(getByTestId('price').textContent).toBe(price);
  });
  it('should render track genre', () => {
    const genre = 'Genre : ' + data.primaryGenreName;
    const { getByTestId } = renderProvider(
      <BrowserRouter>
        <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />
      </BrowserRouter>
    );
    expect(getByTestId('genre').textContent).toBe(genre);
  });
  it('should call dispatchTrackDetail', () => {
    const { baseElement } = renderProvider(
      <BrowserRouter>
        <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />
      </BrowserRouter>
    );
    expect(baseElement).toMatchSnapshot();
    submitSpy();
    expect(submitSpy).toBeCalled();
  });
});
