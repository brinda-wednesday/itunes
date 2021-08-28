/**
 *
 * Tests for CustomCard
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
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
});
