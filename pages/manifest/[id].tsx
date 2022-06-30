import type { NextPage } from 'next'
import Layout from '../../components/Layout/Layout'
import getConfig from 'next/config'
import SearchBox from '../../components/SearchBox/SearchBox';
import styles from '../../styles/Manifest.module.css'
import Mirador from '../../components/Mirador/Mirador';
import useBootstrap from '../../hooks/useBootstrap';

const { publicRuntimeConfig } = getConfig()

interface ManifestProps {
    id: string
    page: number
    textQuery: string
}

const Manifest: NextPage<ManifestProps> = ({id, page, textQuery} : ManifestProps) => {
    const { data: authData } = useBootstrap()

    const config = {
        id: 'ads_mirador_viewer',
        windows: [{
            imageToolsEnabled: true,
            loadedManifest: `${publicRuntimeConfig.manifestServiceUrl}/${id}/manifest.json`,
            canvasIndex: page - 1,
            defaultSearchQuery: textQuery
        }],
        requests: {
            preprocessors: [
                (url, options) => (url.match(publicRuntimeConfig.serviceUrl) && ({
                    ...options, headers: {
                        Authorization: `${authData?.token_type} ${authData?.access_token}`
                    }
                }))
            ]
        },
        osdConfig: {
            loadTilesWithAjax: true,
            alwaysBlend: false,
            blendTime: 0.1,
            preserveImageSizeOnResize: true,
            preserveViewport: true,
            showNavigationControl: false,
        }
    }

    // Monkey patch XHR requests made by OSD to inject the auth header
    if (typeof window !== "undefined") {
        let oldXHROpen = window.XMLHttpRequest.prototype.open;
        window.XMLHttpRequest.prototype.open = function (method: string, url: string | URL, async?: boolean, username?: string | null, password?: string | null): void {
            oldXHROpen.apply(this, arguments);

            if (authData?.access_token) {
                this.setRequestHeader('Authorization', "Bearer " + authData?.access_token);
            }

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
    const { id, full = '', p = 1 } = query;
    const props : ManifestProps =  { id: String(id), textQuery: String(full), page: Number(p) }
    return props
}

export default Manifest
