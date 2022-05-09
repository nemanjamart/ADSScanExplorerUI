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
    this.miradorInstance.store.subscribe(() => {
      let state = this.miradorInstance.store.getState();
      console.log(state.windows);
    });
    // Hacky example of waiting a specified time to add a window... Don't do this for real
    // setTimeout(() => {
    //   console.log(config)
    //   this.miradorInstance.store.dispatch(
    //     mirador.actions.addWindow({
    //       manifestId: config.loadedManifest
    //     })
    //   );
    // }, 5000);
  }
  render() {
    const { config } = this.props;
    return <div id={config.id} />;
  }
}





export default Mirador;

// interface MiradorProps {
//   config: any;
//   plugins: any,
// }

// function Mirador(props: MiradorProps) {
//   const [instance, setInstance] = useState<any | null>(null);

//   useEffect(() => {
//     const i = mirador.viewer(props.config, props.plugins)
//     setInstance(i)
//     i.store.subscribe(() => {
//       let state = i.store.getState();
//       console.log(state.windows);
//     });
//   }, [props, instance])


//   setTimeout(() => {
//     if (instance != null) {
//       instance.store.dispatch(
//         mirador.actions.addWindow({
//           manifestId: "https://purl.stanford.edu/bk785mr1006/iiif/manifest"
//         })
//       );
//     } else {
//       console.log("null error")
//     }

//   }, 5000);


//   return (<div id={props.config.id} />)
// }

// export default Mirador;