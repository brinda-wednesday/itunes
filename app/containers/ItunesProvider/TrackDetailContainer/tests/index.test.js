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
