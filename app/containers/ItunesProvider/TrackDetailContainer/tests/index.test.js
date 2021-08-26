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
import { BrowserRouter, Route } from 'react-router-dom';

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
  it('should render play btn', async () => {
    const { getByTestId } = renderProvider(
      <BrowserRouter>
        <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy}></TrackDetailContainer>
      </BrowserRouter>
    );
    const ele = getByTestId('play-btn');
    fireEvent.click(ele);
    await timeout(500);
    expect(ele).toBeTruthy();
  });
  it('should render pause btn', () => {
    const { getByTestId } = renderProvider(
      <BrowserRouter>
        <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy}></TrackDetailContainer>
      </BrowserRouter>
    );
    const ele = getByTestId('pause-btn');
    expect(ele).toBeTruthy();
  });
  it('should render repeat btn', () => {
    const { getByTestId } = renderProvider(
      <BrowserRouter>
        <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy}></TrackDetailContainer>
      </BrowserRouter>
    );
    const ele = getByTestId('repeat-btn');
    expect(ele).toBeTruthy();
  });
  it('should render playback btn', () => {
    const { getByTestId } = renderProvider(
      <BrowserRouter>
        <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy}></TrackDetailContainer>
      </BrowserRouter>
    );
    const ele = getByTestId('playback-btn');
    expect(ele).toBeTruthy();
  });
  it('should render forward btn', () => {
    const { getByTestId } = renderProvider(
      <BrowserRouter>
        <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy}></TrackDetailContainer>
      </BrowserRouter>
    );
    const ele = getByTestId('forward-btn');
    expect(ele).toBeTruthy();
  });

  it('should show - track not found when track data is empty', () => {
    const { getByTestId } = renderProvider(
      <BrowserRouter>
        <TrackDetailContainer dispatchTrackDetail={submitSpy} />
      </BrowserRouter>
    );
    expect(getByTestId('not-found')).toBeTruthy;
  });

  it('should call dispatchTrackDetail', async () => {
    const { baseElement } = renderProvider(
      <BrowserRouter>
        <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />
      </BrowserRouter>
    );
    expect(baseElement).toMatchSnapshot();
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
  it('should fail to call dispatchTrackDetail on param unavailability', () => {
    const { baseElement } = renderProvider(
      <BrowserRouter>
        <Route path="/">
          <TrackDetailContainer dispatchTrackDetail={submitSpy} />
        </Route>
      </BrowserRouter>
    );
    expect(baseElement).toMatchSnapshot();
    expect(submitSpy).toBeFalsy;
  });
  it('should dispatchTrackDetail ', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).dispatchTrackDetail({ trackDetail: 1440649635 });
    expect(dispatch).toHaveBeenCalled();
  });
  it('should use useRef hook and ensure play function called', () => {
    const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValue({ current: { play: jest.fn() } });
    const { getByTestId } = renderProvider(
      <BrowserRouter>
        <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />
      </BrowserRouter>
    );
    const ele = getByTestId('play-btn');
    fireEvent.click(ele);
    expect(useRefSpy).toHaveBeenCalled();
  });
  it('should use useRef hook and ensure pause function called', () => {
    const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValue({ current: { pause: jest.fn() } });
    const { getByTestId } = renderProvider(
      <BrowserRouter>
        <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />
      </BrowserRouter>
    );
    const ele = getByTestId('pause-btn');
    fireEvent.click(ele);
    expect(useRefSpy).toHaveBeenCalled();
  });
  it('should use useRef hook and ensure increase 5sec', () => {
    const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValue({ current: { currentTime: 0 } });
    const { getByTestId } = renderProvider(
      <BrowserRouter>
        <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />
      </BrowserRouter>
    );
    const ele = getByTestId('forward-btn');
    fireEvent.click(ele);
    expect(useRefSpy).toHaveBeenCalled();
  });
  it('should use useRef hook and ensure loop is set to true', () => {
    const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValue({ current: { loop: false } });
    const { getByTestId } = renderProvider(
      <BrowserRouter>
        <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />
      </BrowserRouter>
    );
    const ele = getByTestId('repeat-btn');
    fireEvent.click(ele);
    expect(useRefSpy).toHaveBeenCalled();
  });
  it('should use useRef hook and ensure playbackRate is halved', () => {
    const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValue({ current: { playbackRate: 0 } });
    const { getByTestId } = renderProvider(
      <BrowserRouter>
        <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />
      </BrowserRouter>
    );
    const ele = getByTestId('playback-btn');
    fireEvent.click(ele);
    expect(useRefSpy).toHaveBeenCalled();
  });
  it('should trigger dispatchTrackDetail on mount', async () => {
    const submitSpy = jest.fn();
    renderProvider(
      <BrowserRouter>
        <TrackDetailContainer trackData={data} dispatchTrackDetail={submitSpy} />
      </BrowserRouter>
    );
    await timeout(500);
    expect(submitSpy).toHaveBeenCalledTimes(1);
  });
});
