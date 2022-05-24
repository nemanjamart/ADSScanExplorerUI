import type { NextPage } from 'next'
import Mirador from '../../../components/Mirador/Mirador'
import { useRouter } from 'next/router'
import React from 'react';
import Layout from '../../../components/Layout/Layout'

const Viewer: NextPage = () => {
    const router = useRouter()
    const { id, pageNum } = router.query

    return (
        <Layout>
            {id ? <Mirador config={{ id: "mirador", windows: [{ loadedManifest: `${process.env.NEXT_PUBLIC_MANIFEST_SERVICE}/${id}/manifest.json`, canvasIndex: Number(pageNum)-1}] }} /> : <>Loading...</>}
        </Layout>
    )
}

export default Viewer
