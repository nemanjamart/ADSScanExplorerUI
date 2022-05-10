import React, { Component } from "react";
import mirador from "mirador";

class Mirador extends Component {
  constructor(props) {
    super(props);
    this.miradorInstance = null;
  }
  componentDidMount() {
    const { config, plugins } = this.props;
    this.miradorInstance = mirador.viewer(config, plugins);
    // Example of subscribing to state
    // this.miradorInstance.store.subscribe(() => {
    //   let state = this.miradorInstance.store.getState();
    //   console.log(state.windows);
    // });
  }
  render() {
    const { config } = this.props;
    return <div id={config.id} />;
  }
}



export default Mirador;