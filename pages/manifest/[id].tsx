import type { NextPage } from 'next'
import Layout from '../../components/Layout/Layout'
import getConfig from 'next/config'
import SearchBox from '../../components/SearchBox/SearchBox';
import styles from '../../styles/Manifest.module.css'
import Mirador from '../../components/Mirador/Mirador';

const { publicRuntimeConfig } = getConfig()

const Manifest: NextPage = (props) => {

    const config = {
        id: 'ads_mirador_viewer',
        windows: [{
            imageToolsEnabled: true,
            loadedManifest: `${publicRuntimeConfig.publicManifestServiceUrl}/${props['id']}/manifest.json`,
            canvasIndex: Number(props['page']) - 1,
            defaultSearchQuery: props['query']
        }]
    }


    return (
        <Layout>
            <div className={styles.searchHeader}>
                <div className={styles.searchBoxContainer}>
                    <SearchBox />
                </div>
            </div>
            <div className={styles.miradorContainer}>
                <Mirador config={config} />
            </div>
        </Layout>)
}

Manifest.getInitialProps = async ({ query }) => {
    const { id, q = '', p = 1 } = query;
    return { id: id, query: q, page: p }
}

export default Manifest
