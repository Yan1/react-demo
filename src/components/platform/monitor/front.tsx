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
export default class Front extends React.Component<DeployProps, {greeting: string}> {

  render() {
    const { userStore } = this.props

    return (
      <div>
        <h1>End</h1>
      </div>
    )
  }
}