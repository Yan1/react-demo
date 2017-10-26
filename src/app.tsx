import * as React from 'react'
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'

interface RouteProps {
  title: string,
  path: string,
  exact?: boolean,
  component: any
}

const routes: RouteProps[] = [
  { 
    title: 'login',
    path: '/login',
    component: () => <h2>login</h2>
  },
  { 
    title: 'platform',
    path: '/platform',
    component: () => <h2>platform</h2>
  }
]

export class App extends React.Component<any, any> {
  render() {
    const loggedIn = false

    return (
      <Provider>
        <Router>
          <div>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props) => (
                  (!loggedIn && route.path !== 'login') ? (
                    <Redirect to='/login' />
                  ) : <route.component />
                )}
              />
            ))}

            <Route 
              exact={true} 
              path="/" 
              render={() => (
                loggedIn ? (
                  <Redirect to='/platform' />
                ) : (
                  <Redirect to='/login' />
                )
              )} 
            />
          </div>
        </Router>
      </Provider>
    );
  }
}
