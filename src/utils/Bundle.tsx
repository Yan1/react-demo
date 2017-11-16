import * as React from 'react'

export interface BundleProps {
  load: any,
  children: any
}

export default class Bundle extends React.Component<BundleProps, any> {
  constructor(props: BundleProps) {
    super(props)
    this.state = {
      mod: null
    }
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props: any) {
    this.setState({ mod: null });
    props.load((mod: any) => {
      // handle both es import and cjs
      this.setState({ mod: mod.default ? mod.default : mod });
    })
  }

  render() {
    return (
      <div>
        {
          this.props.children(this.state.mod)
        }
      </div>
    );
  }
}
