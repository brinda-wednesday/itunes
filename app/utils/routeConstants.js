export default {
  repos: {
    route: '/',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  itunes: {
    route: '/itunes',
    exact: true
  },
  trackDetails: {
    route: '/itunes/:trackId',
    exact: true
  }
};
