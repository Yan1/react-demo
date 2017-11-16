const platform = '/p'

import * as Login from '../components/login/index.bundle'
import * as NotFount from '../components/NotFound.bundle'

import * as Monitor from 'Platform/monitor/index.bundle'
import * as Deploy from 'Platform/deploy/index.bundle'

const Routes = {
  index: {
    path: `${platform}/monitor`
  },
  login: {
    path: '/login',
    component: Login
  },
  notFound: {
    path: '/404',
    component: NotFount
  },
  monitor: {
    path: `${platform}/monitor`,
    component: Monitor
  },
  deploy: {
    path: `${platform}/deploy`,
    component: Deploy
  }
}

export default Routes