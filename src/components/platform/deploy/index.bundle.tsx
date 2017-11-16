import * as React from 'react'
import { Link, Route } from 'react-router-dom'

export interface DeployProps {
  
}

export default class Deploy extends React.Component<DeployProps, {greeting: string}> {
  constructor(props: DeployProps) {
    super(props)
    this.state = {
      greeting: 'Deploy'
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.greeting}</h1>
      </div>
    )
  }
}