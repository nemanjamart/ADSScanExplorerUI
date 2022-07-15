import { useEffect } from "react";
import styles from "./Mirador.module.css"
import * as React from "react";


interface MiradorProps {
    config: any
}



const Mirador = ({ config }: MiradorProps) => {
    useEffect(() => {
        const initializeMirador = async () => {
            const mirador = (await import("mirador/dist/es/src/index")).default;
            const imageToolsPlugin = (await import("mirador-image-tools")).miradorImageToolsPlugin;
            const miradorInstance = mirador.viewer(config, [...imageToolsPlugin]);
    
            // Example of subscribing to state
            // miradorInstance.store.subscribe(() => {
            //   let state = miradorInstance.store.getState();
            //   console.log(state.windows);
            // });

        };
        initializeMirador();
    }, [config]);

    return (
        <div id={config.id} className={styles.viewer} />
    );
}


export default Mirador