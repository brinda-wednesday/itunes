/**
 *
 * Tests for CustomCard
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl, renderProvider } from '@utils/testUtils';
import CustomCard from '../index';

describe('<CustomCard />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<CustomCard />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 CustomCard component', () => {
    const { getAllByTestId } = renderWithIntl(<CustomCard />);
    expect(getAllByTestId('custom-card').length).toBe(1);
  });

  it('should render repo name', () => {
    const name = 'xyz';
    const { getAllByTestId, getByTestId } = renderProvider(<CustomCard name={name} />);
    expect(getAllByTestId('repo-name').length).toBe(1);
    expect(getByTestId('repo-name').textContent).toBe('Repository Name: xyz');
  });

  it('should render full name', () => {
    const fullName = 'abc';
    const { getAllByTestId, getByTestId } = renderProvider(<CustomCard fullName={fullName} />);
    expect(getAllByTestId('full-name').length).toBe(1);
    expect(getByTestId('full-name').textContent).toBe('Repository full name: abc');
  });

  it('should render stargazers count', () => {
    const stargazersCount = 1234;
    const { getAllByTestId, getByTestId } = renderProvider(<CustomCard stargazersCount={stargazersCount} />);
    expect(getAllByTestId('stargazer-count').length).toBe(1);
    expect(getByTestId('stargazer-count').textContent).toBe('Repository stars: 1234');
  });
});
