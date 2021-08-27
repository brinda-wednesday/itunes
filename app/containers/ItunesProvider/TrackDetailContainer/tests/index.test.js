/**
 *
 * Tests for TrackDetailContainer
 *
 *
 */

import React from 'react';
import { renderProvider, timeout } from '@utils/testUtils';
import { mapDispatchToProps, TrackDetailContainerTest as TrackDetailContainer } from '../index';
import { testItunesData } from '@app/utils/testData';
import { fireEvent } from '@testing-library/dom';

describe('<TrackDetailContainer /> container tests', () => {
  let submitSpy;
  const data = testItunesData.results[0];

  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should render audio src', () => {
    const { getByTestId } = renderProvider(<TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />);
    expect(getByTestId('audio-src').src).toBe(data.previewUrl);
  });

  it('should render pause btn', () => {
    const { getByTestId } = renderProvider(
      <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy}></TrackDetailContainer>
    );
    const ele = getByTestId('pause-btn');
    expect(ele).toBeTruthy();
  });

  it('should show - track not found when track data is empty', () => {
    const { getByTestId } = renderProvider(<TrackDetailContainer dispatchTrackDetail={submitSpy} />);
    expect(getByTestId('not-found')).toBeTruthy;
  });

  it('should call dispatchTrackDetail on mount', async () => {
    renderProvider(<TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />);
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });

  it('should dispatchTrackDetail match to the props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).dispatchTrackDetail({ trackDetail: 1440649635 });
    expect(dispatch).toHaveBeenCalled();
  });

  it('should invoke dispatchTrackDetail when params.trackId is present', async () => {
    const submitSpy = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({ trackId: null });
    renderProvider(<TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />);
    await timeout(500);
    expect(submitSpy).toHaveBeenCalledTimes(0);
  });
  it('should invoke dispatchTrackDetail when params.trackId is present', async () => {
    const submitSpy = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({ trackId: 10 });
    const { TrackDetailContainerTest: TrackDetailContainer } = require('../index');
    renderProvider(<TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />);
    await timeout(500);
    expect(submitSpy).toHaveBeenCalledTimes(1);
  });
  it('should call play the track on button click', () => {
    const playBtnSpy = jest.spyOn(require('react'), 'useRef').mockReturnValue({ current: { play: jest.fn() } });
    const { getByTestId } = renderProvider(<TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />);
    const playBtn = getByTestId('play-btn');
    fireEvent.click(playBtn);
    expect(playBtnSpy).toHaveBeenCalled();
  });
  it('should pause the track on pause btn click', () => {
    const { getByTestId, getByText } = renderProvider(
      <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />
    );
    const pauseBtn = getByTestId('pause-btn');
    fireEvent.click(pauseBtn);
    expect(getByText('Track Paused')).toBeTruthy();
  });
  it('should forward the track 5s on forward btn click', () => {
    const spy = jest.spyOn(require('react'), 'useRef').mockReturnValue({ current: { currentTime: 0 } });
    const { getByTestId, getByText } = renderProvider(
      <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />
    );
    const forwardBtn = getByTestId('forward-btn');
    fireEvent.click(forwardBtn);
    expect(getByText('Track Forwarded 5s')).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });
  it('should reduce the playbackRate on btn click', () => {
    const spy = jest.spyOn(require('react'), 'useRef').mockReturnValue({ current: { playbackRate: 0 } });
    const { getByTestId, getByText } = renderProvider(
      <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />
    );
    const playbackBtn = getByTestId('playback-btn');
    fireEvent.click(playbackBtn);
    expect(getByText('Track rate halved')).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });
});
