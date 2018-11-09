import loadable from 'helpers/loadable';
import HomePage from 'containers/homePage';

const routers = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  }
];

export default routers;
