import type { NextPage } from 'next'
import React from 'react';
import Layout from '../../components/Layout/Layout'
import getConfig from 'next/config'
import SearchBox from '../../components/SearchBox/SearchBox';
import styles from '../../styles/Manifest.module.css'
import Mirador from '../../components/Mirador/Mirador';

const Manifest: NextPage = (config) => {
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


export async function getServerSideProps(context) {
    const { id, p = 1 } = context.query;
    const { serverRuntimeConfig } = getConfig()

    return {
        props: {
            id: 'ads_mirador_viewer',
            windows: [{
                imageToolsEnabled: true,
                loadedManifest: `/scan/api/manifest?id=${id}`,
                canvasIndex: Number(p) - 1
            }]
        }
    }
}

export default Manifest
