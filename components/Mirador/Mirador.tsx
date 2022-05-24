import { useEffect } from "react";
import styles from "./Mirador.module.css"

export default function Mirador({ config }) {
    useEffect(() => {
        const initializeMirador = async () => {
            const mirador = (await import("mirador/dist/es/src/index")).default;
            const imageToolsPlugin = (await import("mirador-image-tools")).miradorImageToolsPlugin;
            const miradorInstance = mirador.viewer(config, [...imageToolsPlugin]);

            // Example of subscribing to state
            // miradorInstance.store.subscribe(() => {
            //   let state = this.miradorInstance.store.getState();
            //   console.log(state.windows);
            // });

        };
        initializeMirador();
    }, [config]);

    return (
        <div id={config.id} className={styles.viewer} />
    );
}
