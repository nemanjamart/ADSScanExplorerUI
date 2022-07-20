import type { NextPage } from 'next'
import Layout from '../../components/Layout/Layout'
import getConfig from 'next/config'
import SearchBox from '../../components/SearchBox/SearchBox';
import styles from '../../styles/Manifest.module.css'
import Mirador from '../../components/Mirador/Mirador';
import useBootstrap from '../../hooks/useBootstrap';
import Container from 'react-bootstrap/Container'

const { publicRuntimeConfig } = getConfig()

interface ManifestProps {
    id: string
    page: number
    textQuery: string
}

/**
 * Page that visualizes the IIIF manifest using the Mirador component.
 */    
const Manifest: NextPage<ManifestProps> = ({ id, page, textQuery }: ManifestProps) => {
    const { data: authData } = useBootstrap()

    const config = {
        id: 'ads_mirador_viewer',
        windows: [{
            imageToolsEnabled: true,
            allowClose: false,
            allowFullscreen: true,
            allowMaximize: false,
            allowTopMenuButton: true,
            loadedManifest: `${publicRuntimeConfig.manifestServiceUrl}/${id}/manifest.json`,
            canvasIndex: page - 1,
            defaultSearchQuery: textQuery,
            draggingEnabled: false,
            sideBarPanel: 'search',
            views: [
                { key: 'single' },
                { key: 'book' },
            ],
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
            alwaysBlend: false,
            blendTime: 0.1,
            preserveImageSizeOnResize: true,
            preserveViewport: true,
            showNavigationControl: false,
            loadTilesWithAjax: true,
            ajaxHeaders: {
                'Authorization': "Bearer " + authData?.access_token
            }
        },
        thumbnailNavigation: {
            displaySettings: false
        },
        workspace: {
            showZoomControls: true
        },
        workspaceControlPanel: {
            enabled: false,
        },
    }

    
    return (
        <Layout>
            <div className='d-flex mb-2'>
                <SearchBox />
            </div>
            <Container fluid className="d-flex flex-column h-100">
                <Mirador config={config} />
            </Container>
        </Layout>)
}

Manifest.getInitialProps = async ({ query }) => {
    const { id, full = '', p = 1 } = query;
    const props: ManifestProps = { id: String(id), textQuery: String(full), page: Number(p) }
    return props
}

export default Manifest
