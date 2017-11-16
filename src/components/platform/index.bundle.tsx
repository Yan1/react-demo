import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Link, Route, Redirect } from 'react-router-dom'
import { Button } from 'antd'

import Bundle from 'Bundle'

import Routes from 'Utils/Routes'
const { monitor, deploy } = Routes

import UserStore from 'User/store'

const CreateComponent = (component: any) => () => {
  return (
    <Bundle load={component}>
      {
        (Component: any) => Component ? (<div><Component /></div>) : (<div>Loading...</div>)
      }
    </Bundle>
  )
}

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
        <Route exact={true} path={monitor.path} component={CreateComponent(monitor.component)} />
        <Route exact={true} path={deploy.path} component={CreateComponent(deploy.component)} />
      </div>
    )
  }
}