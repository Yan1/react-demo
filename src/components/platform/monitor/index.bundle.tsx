import * as React from 'react'
import { Link, Route } from 'react-router-dom'

import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd'

import { User } from 'Platform/user/model'
import UserStore from 'Platform/user/store'

import createLazyContainer from 'Bundle'
const End = createLazyContainer(() => import(/* webpackChunkName: "end" */ './end'))
const Front = createLazyContainer(() => import(/* webpackChunkName: "front" */ './front'))

export interface DeployProps {
  userStore: UserStore
}

@inject('userStore')
@observer
export default class Deploy extends React.Component<DeployProps, {greeting: string}> {
  constructor(props: DeployProps) {
    super(props)
    this.state = {
      greeting: 'monitor'
    }
  }

  changeName = (user: User) => {
    const { userStore } = this.props

    userStore.changeName(user.name, user.name + 'v')
        .then((users) => {
          console.log(toJS(users)[0])
        })
  }

  componentDidMount() {
    console.log('Monitor did mount')
  }
  componentWillReceiveProps() {
    console.log('Monitor will receive')
  }

  render() {
    const { userStore } = this.props

    return (
      <div>
        <h1>{this.state.greeting}</h1>
        <ul>
          {
            userStore.users.map((user) => (
                <li key={user.id}>
                  <span>{user.name}</span>
                  <button type="button" onClick={this.changeName.bind(this, user)}>change</button>
                </li>
            ))
          }
        </ul>
        <hr/>
        <ul>
          <li><Link to='/p/monitor/end'>Montir-end</Link></li>
          <li><Link to='/p/monitor/front'>Monitor-front</Link></li>
        </ul>

        <Route exact={true} component={End} path='/p/monitor/end' />
        <Route exact={true} component={Front} path='/p/monitor/front' />
        <Button type="primary">Test</Button>
      </div>
    )
  }
}