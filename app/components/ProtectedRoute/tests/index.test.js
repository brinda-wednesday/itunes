import React from 'react';
import { renderProvider } from '@utils/testUtils';
import ProtectedRoute from '../index';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import HomeContainer from '@app/containers/HomeContainer';

jest.mock('@utils/routeConstants', () => {
  return {
    dashboard: {
      route: '/',
      isProtected: true
    },
    login: {
      route: '/login',
      isProtected: false
    }
  };
});

describe('<ProtectedRoute />', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(
      <BrowserRouter>
        <ProtectedRoute isLoggedIn={true} render={HomeContainer} exact={true} path="/" />
      </BrowserRouter>
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should  render the component if user logged in and access protected route', () => {
    const { getByTestId } = renderProvider(
      <BrowserRouter>
        <ProtectedRoute isLoggedIn={true} render={HomeContainer} exact={true} path="/" />
      </BrowserRouter>
    );
    expect(getByTestId('clickable')).toBeTruthy();
  });
  it('should not render component if user is not logged in', () => {
    renderProvider(
      <BrowserRouter>
        <ProtectedRoute isLoggedIn={false} render={HomeContainer} exact={true} path="/" handleLogout={submitSpy} />
      </BrowserRouter>
    );
    expect(submitSpy).toHaveBeenCalledTimes(1);
  });
  it('should render component , not logged in, unprotected route', () => {
    const { queryByTestId } = renderProvider(
      <BrowserRouter>
        <ProtectedRoute isLoggedIn={false} render={HomeContainer} exact={true} path="/login" />
      </BrowserRouter>
    );
    expect(queryByTestId('clickable')).toBeInTheDocument();
  });
});
