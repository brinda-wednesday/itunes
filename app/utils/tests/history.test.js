import { getHistory } from '../history';

describe('tests for history(baseurl)', () => {
  jest.mock('@utils/routeConstants', () => {
    return {
      itunes: {
        route: '/',
        exact: true
      },
      repos: {
        route: '/github/repo/',
        exact: true
      },
      trackDetails: {
        route: '/:trackId',
        exact: true
      }
    };
  });

  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });
  it('should be defined , by default in dev environment', () => {
    expect(getHistory).toBeDefined();
    expect(process.env.ENVIRONMENT_NAME).not.toBe('uat');
    expect(process.env.NODE_ENV).toBe('development');
  });

  it('should check env variable as uat', () => {
    process.env.ENVIRONMENT_NAME = 'uat';
    const history = getHistory();
    expect(history.length).toBe(1);
  });
});
