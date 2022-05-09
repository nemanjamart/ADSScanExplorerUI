import type { NextPage } from 'next'
import Head from 'next/head'
import Mirador from '../../components/Mirador/mirador'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import React from 'react';

const Viewer: NextPage = () => {
    const router = useRouter()
    const { id } = router.query

    return (
        <div className={styles.container}>
            <Head>
                <title>ADS Scan Explorer</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                {id ? <Mirador config={{ id: "mirador", windows: [{ loadedManifest: `${process.env.NEXT_PUBLIC_MANIFEST_SERVICE}/${id}/manifest.json` }] }} plugins={[]} /> : <>Loading...</>}

            </main>
        </div>
    )
}

export default Viewer
