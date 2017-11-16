import * as React from 'react'

export interface NotFoundProps {
}

export default class NotFound extends React.Component<NotFoundProps, {greeting: string}> {
  constructor(props: NotFoundProps) {
    super(props)
    this.state = {
      greeting: 'Not found'
    }
  }

  render() {
    return <h1>{this.state.greeting}</h1>
  }
}