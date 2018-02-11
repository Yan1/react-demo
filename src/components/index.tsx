import * as React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import createLazyContainer from 'Bundle'
import Fetch from 'Fetch'

/* import * as Home from './Home.bundle'
import * as Platform from './platform/index.bundle'

import * as Login from './login/index.bundle'
import * as NotFount from './NotFound.bundle' */
const Home  = createLazyContainer(() => import(/* webpackChunkName: "home" */ './Home.bundle'))
const Platform  = createLazyContainer(() => import(/* webpackChunkName: "platform" */ './platform/index.bundle'))
const Login  = createLazyContainer(() => import(/* webpackChunkName: "login" */ './login/index.bundle'))
const NotFount  = createLazyContainer(() => import(/* webpackChunkName: "notfound" */ './NotFound.bundle'))

const isLoggedIn = true

export interface AppProps {
}

export default class App extends React.Component<AppProps, any> {
  render() {
    return (
      <BrowserRouter>
        <div>
            <Switch>
              <Route exact={true} path='/' component={(Home)}/>
              <Route
                exact={false}
                path='/p'
                component={isLoggedIn ? (Platform) : () => <Redirect to='/login' />}
              />
              <Route exact={true} path='/login' component={(Login)}/>
              <Route exact={true} path='/404' component={(NotFount)} />
              <Route exact={false} path='*' component={(NotFount)} />
              {/* <Redirect from='*' to='/404' /> */}
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
