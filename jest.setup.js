import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    setState: jest.fn(),
    useParams: () => ({ trackId: 1440649635 }),
    useState: jest.fn().mockImplementation((init) => [init, jest.fn()]),
    useRef: jest.fn().mockReturnValue({
      current: {
        play: jest.fn(),
        pause: jest.fn(),
        currentTime: 0,
        loop: false,
        playbackRate: 0
      }
    }),
    useLocation: jest.fn().mockReturnValue({
      pathname: '/',
      search: '',
      hash: '',
      state: null,
      key: '5nvxpbdafa'
    }),
    useHistory: jest.fn().mockReturnValue({
      length: 2,
      action: 'POP',
      push: jest.fn(),
      location: {
        pathname: '/',
        search: '',
        hash: ''
      }
    })
  };
});
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn(() => {
    return {
      matches: true,
      addListener: jest.fn(),
      removeListener: jest.fn()
    };
  })
});
