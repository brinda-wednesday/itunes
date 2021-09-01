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

  it('should show pause button if the track is playing', async () => {
    const { getByTestId, queryByTestId } = renderProvider(
      <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />
    );
    const ele = getByTestId('play-btn');
    expect(queryByTestId('pause-btn')).not.toBeTruthy();
    fireEvent.click(ele);
    await timeout(1000);
    expect(getByTestId('pause-btn')).toBeTruthy();
  });
  it('should render play btn again if track paused', async () => {
    const { getByTestId, queryByTestId } = renderProvider(
      <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />
    );
    const ele = getByTestId('play-btn');
    expect(queryByTestId('pause-btn')).not.toBeTruthy();
    fireEvent.click(ele);
    await timeout(500);
    expect(getByTestId('pause-btn')).toBeTruthy();
    fireEvent.click(getByTestId('pause-btn'));
    await timeout(500);
    expect(ele).toBeTruthy();
  });
  it('should show playbackrate btn only if the track is playing', async () => {
    const { getByTestId, queryByTestId } = renderProvider(
      <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />
    );
    const ele = getByTestId('play-btn');
    expect(queryByTestId('playback-btn')).not.toBeTruthy();
    fireEvent.click(ele);
    await timeout(500);
    expect(getByTestId('playback-btn')).toBeTruthy();
  });

  it('should not show play btn if user is trying to slow the playbackrate', async () => {
    const { getByTestId, queryByTestId } = renderProvider(
      <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />
    );
    fireEvent.click(getByTestId('play-btn'));
    await timeout(500);
    fireEvent.click(getByTestId('playback-btn'));
    await timeout(500);
    expect(queryByTestId('play-btn')).not.toBeTruthy();
  });

  it('should not show play btn if user is trying to forward the track by 5s', async () => {
    const { getByTestId, queryByTestId } = renderProvider(
      <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />
    );
    fireEvent.click(getByTestId('play-btn'));
    await timeout(500);
    fireEvent.click(getByTestId('forward-btn'));
    await timeout(500);
    expect(queryByTestId('play-btn')).not.toBeTruthy();
  });

  it('should show - track not found when track data is empty', () => {
    const { getByTestId } = renderProvider(<TrackDetailContainer dispatchTrackDetail={submitSpy} />);
    expect(getByTestId('not-found')).toBeTruthy;
  });

  it('should call dispatchTrackDetail on mount', async () => {
    const trackId = 1440649635;
    renderProvider(<TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />);
    await timeout(500);
    expect(submitSpy).toBeCalled();
    expect(submitSpy).toBeCalledWith(trackId);
  });

  it('should dispatchTrackDetail match to the props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).dispatchTrackDetail({ trackDetail: 1440649635 });
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch.mock.calls[0][0].trackDetail).toStrictEqual({ trackDetail: 1440649635 });
  });

  it('should invoke dispatchTrackDetail when params.trackId is absent', async () => {
    const submitSpy = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({ trackId: null });
    renderProvider(<TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />);
    await timeout(500);
    expect(submitSpy).toHaveBeenCalledTimes(0);
  });
});
