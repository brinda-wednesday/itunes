import NotFound from '@containers/NotFoundPage/Loadable';
import routeConstants from '@utils/routeConstants';
import ITunes from '@app/containers/ItunesProvider/TracksContainer/Loadable';
import TrackDetailContainer from '@app/containers/ItunesProvider/TrackDetailContainer/Loadable';
export const routeConfig = {
  itunes: {
    component: ITunes,
    ...routeConstants.itunes
  },
  trackDetail: {
    component: TrackDetailContainer,
    ...routeConstants.trackDetails
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
