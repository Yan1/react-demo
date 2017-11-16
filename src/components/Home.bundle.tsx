import * as React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import Routes from 'Utils/Routes'

import UserStore from 'User/store'

export interface HomeProps {
  userStore: UserStore
}

@inject('userStore')
@observer
export default class Home extends React.Component<HomeProps, {greeting: string}> {
  constructor(props: HomeProps) {
    super(props)
    this.state = {
      greeting: 'Home'
    }
  }

  render() {
    const { userStore } = this.props
    const { isLogin } = userStore
    
    return <Redirect to={{pathname: isLogin ? Routes.index.path : Routes.login.path}} />
  }
}