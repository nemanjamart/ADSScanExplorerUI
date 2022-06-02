import type { NextPage } from 'next'
import Layout from '../../components/Layout/Layout'
import getConfig from 'next/config'
import SearchBox from '../../components/SearchBox/SearchBox';
import styles from '../../styles/Manifest.module.css'
import Mirador from '../../components/Mirador/Mirador';
import useBootstrap from '../../hooks/useBootstrap';

const { publicRuntimeConfig } = getConfig()

const Manifest: NextPage = (props) => {
    const { data: authData } = useBootstrap()

    const config = {
        id: 'ads_mirador_viewer',
        windows: [{
            imageToolsEnabled: true,
            loadedManifest: `${publicRuntimeConfig.manifestServiceUrl}/${props['id']}/manifest.json`,
            canvasIndex: Number(props['page']) - 1,
            defaultSearchQuery: props['query']
        }],
        requests: {
            preprocessors: [
                (url, options) => (url.match(publicRuntimeConfig.manifestServiceUrl) && ({
                    ...options, headers: {
                        Authorization: `${authData?.token_type} ${authData?.access_token}`
                    }
                }))
            ]
        }
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
