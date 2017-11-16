import * as React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Bundle from 'Bundle'
import Fetch from 'Fetch'

import * as Home from './Home.bundle'
import * as Platform from './platform/index.bundle'

import * as Login from './login/index.bundle'
import * as NotFount from './NotFound.bundle'

const CreateComponent = (component: any) => () => {
  return (
    <Bundle load={component}>
      {
        (Component: any) => Component ? (<div><Component /></div>) : (<div>Loading...</div>)
      }
    </Bundle>
  )
}

const isLoggedIn = true

export interface AppProps {
}

export default class App extends React.Component<AppProps, any> {
  render() {
    return (
      <BrowserRouter>
        <div>
            <Switch>
              <Route exact={true} path='/' component={CreateComponent(Home)}/>
              <Route
                exact={false}
                path='/p'
                component={isLoggedIn ? CreateComponent(Platform) : () => <Redirect to='/login' />}
              />
              <Route exact={true} path='/login' component={CreateComponent(Login)}/>
              <Route exact={true} path='/404' component={CreateComponent(NotFount)} />
              <Route exact={false} path='*' component={CreateComponent(NotFount)} />
              {/* <Redirect from='*' to='/404' /> */}
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
