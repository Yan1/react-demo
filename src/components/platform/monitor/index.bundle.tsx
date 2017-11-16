import * as React from 'react'
import { Link, Route } from 'react-router-dom'

import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'

import { User } from 'Platform/user/model'
import UserStore from 'Platform/user/store'

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
      </div>
    )
  }
}