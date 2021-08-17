/**
 *
 * Tests for ItunesCard
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderProvider, renderWithIntl } from '@utils/testUtils';
import ItunesCard from '../index';

describe('<ItunesCard />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<ItunesCard />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 ItunesCard component', () => {
    const { getAllByTestId } = renderWithIntl(<ItunesCard />);
    expect(getAllByTestId('itunes-card').length).toBe(1);
  });
  it('should render song title', () => {
    const { getAllByTestId } = renderProvider(<ItunesCard />);
    expect(getAllByTestId('song-name').length).toBe(1);
  });
  it('should render artist image', () => {
    const { getAllByTestId } = renderProvider(<ItunesCard />);
    expect(getAllByTestId('artist-img').length).toBe(1);
  });
  it('should render audio track', () => {
    const { getAllByTestId } = renderProvider(<ItunesCard />);
    expect(getAllByTestId('audio-src').length).toBe(1);
  });
  it('testing for correct track name prop values', () => {
    const { getByTestId } = renderProvider(<ItunesCard songTitle="Faded" />);
    expect(getByTestId('song-name').textContent).toBe('Faded');
  });
  it('testing for correct  audio src prop values', () => {
    const { getByTestId } = renderProvider(
      <ItunesCard audioSrc="https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/36/16/36/36163607-50ce-5dec-846a-782467ea6b09/mzaf_529304218680119840.plus.aac.p.m4a" />
    );
    expect(getByTestId('audio-src').src).toBe(
      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/36/16/36/36163607-50ce-5dec-846a-782467ea6b09/mzaf_529304218680119840.plus.aac.p.m4a'
    );
  });
});
