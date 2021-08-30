import { createBrowserHistory } from 'history';
import routeConstants from '@utils/routeConstants';
const routes = Object.keys(routeConstants);
const pathname = window.location.pathname;
let baseUrl = '';
window.process = {
  env: {
    NODE_ENV: 'development'
  }
};
export function getHistory() {
  if (process.env.ENVIRONMENT_NAME === 'uat') {
    routes.forEach((routeKey) => {
      const route = routeConstants[routeKey].route;
      if (pathname.includes(route)) {
        if (pathname.substring(pathname.length - route.length, pathname.length) === route) {
          baseUrl = pathname.substring(0, pathname.length - route.length);
        }
        if (pathname.substring(pathname.length - route.length, pathname.length - 1) === `${route}/`) {
          baseUrl = pathname.substring(0, pathname.length - route.length - 1);
        }
      }
    });
  }
  return createBrowserHistory({ basename: baseUrl });
}

const history = getHistory();
export default history;
