import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import routeConstants from '@utils/routeConstants';
import ITunes from '@app/containers/ItunesProvider/TracksContainer/Loadable';
export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  itunes: {
    component: ITunes,
    ...routeConstants.itunes
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
