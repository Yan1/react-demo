import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Form, Icon, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
const FormItem = Form.Item

import Routes from 'Utils/Routes'

import UserStore from 'User/store'

export interface LoginProps extends FormComponentProps {
  userStore: UserStore
}

@inject('userStore')
// @Form.create()
@observer
class Login extends React.Component<LoginProps, any> {
  constructor(props: LoginProps) {
    super(props)
  }

  componentWillMount() {
    const { userStore } = this.props

    userStore.switchIsLogin(false)
  }

  handleSubmit = (e: React.SyntheticEvent<HTMLElement>) => {
    const { userStore } = this.props

    e.preventDefault()
    this.props.form.validateFields((err: any, values: any) => {
      if (err) {
        console.log(err)
      } else {
        userStore.loginServer(values)
      }
    })
  }

  render() {
    const { form, userStore } = this.props
    const { isLogin } = userStore
    const { getFieldDecorator } = form

    if (isLogin) {
      return (
        <Redirect to={{pathname: Routes.index.path}} />
      )
    }

    return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
            )}
          </FormItem>
          
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </FormItem>
        </Form>
    )
  }
}

export default Form.create()(Login)