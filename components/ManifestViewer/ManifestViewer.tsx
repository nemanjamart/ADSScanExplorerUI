import Mirador from '../Mirador/Mirador'
import React from 'react';
import SearchBox from '../SearchBox/SearchBox';
import styles from './ManifestViewer.module.css'
import Layout from '../Layout/Layout';

type ManifestProps = {
    manifestId: string
    pageNum?: number
}

const ManifestViewer = ({ manifestId, pageNum = 1 }: ManifestProps) => {

    const config = {
        id: 'ads_mirador_viewer',
        windows: [{
            loadedManifest: `${process.env.NEXT_PUBLIC_MANIFEST_SERVICE}/${manifestId}/manifest.json`,
            canvasIndex: Number(pageNum) - 1
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
        </Layout>
    )
}

export default ManifestViewer