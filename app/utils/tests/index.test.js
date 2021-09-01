import { getCurrentRouteDetails } from '../index';

describe('index tests', () => {
  const location = {
    pathname: '/'
  };
  it('should get the current route details', () => {
    expect(getCurrentRouteDetails(location)).toStrictEqual({ route: '/', exact: true });
  });
  it('should return null if location object not passed', () => {
    expect(getCurrentRouteDetails()).toBe(null);
  });
});
