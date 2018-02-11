import * as React from 'react'

type Loader = () => Promise<any>

type ReactComponent<P> = React.ComponentClass<P> | React.SFC<P> | null

interface IState<P> {
  Component: ReactComponent<P>
  LoadingComponent: ReactComponent<any>
}

function createLazyContainer<P>(loader: Loader, loadingComponent?: ReactComponent<{}>) {
  return class extends React.Component<{}, IState<P>> {
    public static displayName = 'LazyContainer'
    state: IState<P> = {
      Component: null,
      LoadingComponent: loadingComponent || null
    }

    componentWillMount() {
      if (!this.state.Component) {
        loader()
          .then(module => module.default || module)
          .then((Component: ReactComponent<P>) => this.setState({ Component }))
      }
    }

    public render() {
      const { Component, LoadingComponent } = this.state

      if (Component) {
        return <Component {...this.props} />
      }

      if (LoadingComponent) {
        return <LoadingComponent />
      }

      return null
    }
  }
}

export default createLazyContainer
