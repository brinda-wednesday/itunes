/**
 *
 * Tests for HomeContainer
 *
 */

import React, { useState as useStateMock } from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { HomeContainerTest as HomeContainer, mapDispatchToProps } from '../index';

import { homeContainerTypes } from '../reducer';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn()
}));

describe('<HomeContainer /> tests', () => {
  let submitSpy;
  let setState;

  beforeEach(() => {
    submitSpy = jest.fn();
    setState = jest.fn();
    useStateMock.mockImplementation((init) => [init, setState]);
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<HomeContainer dispatchGithubRepos={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearGithubRepos on empty change', async () => {
    const getGithubReposSpy = jest.fn();
    const clearGithubReposSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <HomeContainer dispatchClearGithubRepos={clearGithubReposSpy} dispatchGithubRepos={getGithubReposSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getGithubReposSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearGithubReposSpy).toBeCalled();
  });

  it('should call dispatchGithubRepos on change', async () => {
    const { getByTestId } = renderProvider(<HomeContainer dispatchGithubRepos={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'some repo' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
  it('should dispatch githubRepos when repoName is passed', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).dispatchGithubRepos({ repoName: 'Mac' });
    expect(dispatch).toHaveBeenCalled();
  });
  it('should dispatch clear Repos when repoName is empty', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).dispatchClearGithubRepos();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: homeContainerTypes.CLEAR_GITHUB_REPOS });
  });

  it('should trigger dispatchGithubRepos on mount', async () => {
    const getGithubReposSpy = jest.fn();
    renderProvider(<HomeContainer dispatchGithubRepos={getGithubReposSpy} repoName="mac" />);
    await timeout(500);
    expect(getGithubReposSpy).toHaveBeenCalledTimes(1);
  });

  it('should show repoError ', () => {
    const { getByText } = renderProvider(<HomeContainer reposError="error" />);
    expect(getByText('error')).toBeTruthy();
  });

  it('should set loading to true when repoName present', async () => {
    const getGithubReposSpy = jest.fn();
    renderProvider(<HomeContainer repoName="mac" dispatchGithubRepos={getGithubReposSpy} />);
    await timeout(500);
    expect(getGithubReposSpy).toHaveBeenCalledTimes(1);
    expect(setState).toBeCalledWith(true);
  });
  it('should set loading to false when reposData passed', async () => {
    renderProvider(<HomeContainer reposData={{ items: [] }} />);
    await timeout(500);
    expect(setState).toBeCalledWith(false);
  });
  it('should refresh page on click of button - go to story books', () => {
    const pushSpy = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useHistory').mockReturnValue({ push: pushSpy });
    const { getByText } = renderProvider(<HomeContainer />);
    const clickEle = getByText('Go to Storybook');
    fireEvent.click(clickEle);
    expect(pushSpy).toHaveBeenCalledTimes(1);
  });
});
