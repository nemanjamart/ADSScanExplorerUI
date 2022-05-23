import React, { Component } from "react";
import mirador from 'mirador/dist/es/src/index';
import { miradorImageToolsPlugin } from 'mirador-image-tools';


class Mirador extends Component {
  constructor(props) {
    super(props);
    this.miradorInstance = null;
  }
  componentDidMount() {
    const { config, plugins } = this.props;
    this.miradorInstance = mirador.viewer(config, [...miradorImageToolsPlugin]);
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