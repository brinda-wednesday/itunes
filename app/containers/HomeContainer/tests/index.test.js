/**
 *
 * Tests for HomeContainer
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { HomeContainerTest as HomeContainer, mapDispatchToProps } from '../index';

import { homeContainerTypes } from '../reducer';
import { BrowserRouter, Route, useHistory } from 'react-router-dom';

describe('<HomeContainer /> tests', () => {
  let submitSpy;

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
  it('should trigger reload', () => {
    const history = useHistory();
    const { getByText } = renderProvider(
      <BrowserRouter>
        <Route history={history}>
          <HomeContainer />
        </Route>
      </BrowserRouter>
    );
    const ClickEle = getByText('Go to Storybook');
    fireEvent.click(ClickEle);
    expect(history.location.pathname).toBe('/');
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
});
