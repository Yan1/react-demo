import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import { Button } from 'antd'

import createLazyContainer from 'Bundle'

import Routes from 'Utils/Routes'
const { monitor, deploy } = Routes

const Monitor = createLazyContainer(() => import(/* webpackChunkName: "monitor" */ './monitor/index.bundle'))
const Deploy = createLazyContainer(() => import(/* webpackChunkName: "deploy" */ './deploy/index.bundle'))

// async function hello() {
//   const {
//       default: world
//   } = await import(/* webpackChunkName: "world" */ "./world");
//   document.body.innerText = `hello ${world}`;
// }

// hello();

import UserStore from 'User/store'

export interface PlatformProps {
  userStore: UserStore
}

@inject('userStore')
@observer
export default class Platform extends React.Component<PlatformProps, {greeting: string}> {
  constructor(props: PlatformProps) {
    super(props)
    this.state = {
      greeting: 'Platform'
    }
  }

  componentDidMount() {
    const { userStore } = this.props

    userStore.getUserInfo({username: userStore.getUser()})

    userStore.getNs({ns: ''})
    .then(data => {
      console.log(data)
    })

    console.log('Platform did mount')
  }

  componentWillReceiveProps() {
    console.log('Platform will receive')
  }

  handleLogout = () => {
    this.props.userStore.logoutServer({})
  }

  render() {
    const { userStore } = this.props
    const { isLogin, mobile } = userStore

    if (!isLogin) {
      return <Redirect to={{pathname: Routes.login.path}} />
    }
    return (
      <div>
        <h1>{this.state.greeting}</h1>
        <ul>
          <li><Link to={monitor.path}>Monitor</Link></li>
          <li><Link to={deploy.path}>Deploy</Link></li>
        </ul>
        {mobile}<Button onClick={this.handleLogout}>Logout</Button>
        <Switch>
          <Route exact={false} path={monitor.path} component={(Monitor)} />
          <Route exact={true} path={deploy.path} component={(Deploy)} />
        </Switch>
      </div>
    )
  }
}