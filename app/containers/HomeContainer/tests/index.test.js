/**
 *
 * Tests for HomeContainer
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { HomeContainerTest as HomeContainer, mapDispatchToProps } from '../index';

import { homeContainerTypes } from '@app/containers/HomeContainer/reducer';
import { githubReposData } from '@app/utils/testData';

describe('<HomeContainer /> tests', () => {
  let submitSpy;
  let repoError = 'error';
  let repoName = 'mac';

  beforeEach(() => {
    submitSpy = jest.fn();
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
    renderProvider(<HomeContainer dispatchGithubRepos={getGithubReposSpy} repoName={repoName} />);
    await timeout(500);
    expect(getGithubReposSpy).toHaveBeenCalledTimes(1);
    expect(getGithubReposSpy).toBeCalledWith(repoName);
  });

  it('should show repoError ', () => {
    const { getByText } = renderProvider(<HomeContainer reposError={repoError} />);
    expect(getByText('error')).toBeTruthy();
  });

  it('should refresh page on click of button - go to story books', () => {
    const pushSpy = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useHistory').mockReturnValue({ push: pushSpy });
    const { getByText } = renderProvider(<HomeContainer />);
    const clickEle = getByText('Go to Storybook');
    fireEvent.click(clickEle);
    expect(pushSpy).toHaveBeenCalledTimes(1);
  });
  it('should render  repo cards', async () => {
    const getGithubReposSpy = jest.fn();
    const clearGithubReposSpy = jest.fn();
    const { getAllByTestId } = renderProvider(
      <HomeContainer
        dispatchClearGithubRepos={clearGithubReposSpy}
        dispatchGithubRepos={getGithubReposSpy}
        reposData={githubReposData}
      />
    );
    await timeout(500);
    expect(getAllByTestId('custom-card')).toHaveLength(githubReposData.items.length);
  });
  it('should set loading as false if loading is true, if either repodata or repoerror is present', async () => {
    const { getByText, rerender } = renderProvider(
      <HomeContainer dispatchGithubRepos={submitSpy} repoName={repoName} />
    );
    await timeout(500);
    renderProvider(
      <HomeContainer dispatchGithubRepos={submitSpy} reposError={repoError} repoName={repoName} />,
      rerender
    );
    await timeout(500);
    expect(getByText('error')).toBeTruthy();
  });
});
