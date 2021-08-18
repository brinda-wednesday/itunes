/**
 *
 * Tests for ITunes
 *
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { ITunesTest as ITunes } from '../index';
import 'jest-styled-components';
import { testItunesData } from '@app/utils/testData';

describe('<ITunes /> container tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ITunes dispatchSongs={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });
  it('should call dispatchClearSongs on empty change', async () => {
    const getiTunesSongsSpy = jest.fn();
    const cleariTunesSongsSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <ITunes dispatchClearSongs={cleariTunesSongsSpy} dispatchSongs={getiTunesSongsSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getiTunesSongsSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(cleariTunesSongsSpy).toBeCalled();
  });

  it('should call dispatchSongs on change', async () => {
    const { getByTestId } = renderProvider(<ITunes dispatchSongs={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'some song' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
  it('should render grid', () => {
    const { getAllByTestId } = renderProvider(<ITunes songData={testItunesData} />);
    expect(getAllByTestId('grid')).toBeTruthy();
  });
  it('should render 5 itunes card for sample data', () => {
    const { getAllByTestId } = renderProvider(<ITunes songData={testItunesData} />);
    expect(getAllByTestId('itunes-card')).toHaveLength(5);
  });
});
