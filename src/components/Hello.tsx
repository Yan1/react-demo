import * as React from 'react'

export interface HelloProps {
  compiler: string,
  framework: string
}

export class Hello extends React.Component<HelloProps, {greeting: string}> {
  constructor(props: HelloProps) {
    super(props)
    this.state = {
      greeting: 'Welcome'
    }
  }

  render() {
    return <h1>{this.state.greeting} from {this.props.compiler} and {this.props.framework}!</h1>
  }
}