import { getHistory } from '../history';

describe('tests for history(baseurl)', () => {
  jest.mock('@utils/routeConstants', () => {
    return {
      itunes: {
        route: '/',
        exact: true
      },
      repos: {
        route: '/github/repo',
        exact: true
      }
    };
  });
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });
  it('should be defined ', () => {
    expect(getHistory).toBeDefined();
  });
  it('should check env variable as uat', () => {
    process.env.ENVIRONMENT_NAME = 'uat';
    expect(getHistory().length).toBe(1);
  });
});
