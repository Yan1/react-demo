import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Router, BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory';
const history = createHistory()

import { Provider } from 'mobx-react'

import { stores } from './store/index'

import App from './components/index'

import './styles/index.less'
import './index.less'

ReactDOM.render(
    <Provider {...stores}>
      <App />
    </Provider>,
    document.getElementById('root'))
