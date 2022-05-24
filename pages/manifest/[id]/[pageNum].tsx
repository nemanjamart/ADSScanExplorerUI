import type { NextPage } from 'next'
import Mirador from '../../../components/Mirador/Mirador'
import { useRouter } from 'next/router'
import React from 'react';
import Layout from '../../../components/Layout/Layout'
import { PuffLoader } from 'react-spinners';
import ManifestViewer from '../../../components/ManifestViewer/ManifestViewer';

const Manifest: NextPage = () => {
    const router = useRouter()
    const { id, pageNum } = router.query

    if (!id) {
        return (
            <Layout>
                <PuffLoader size={150} />
            </Layout>
        )
    }

    return <ManifestViewer manifestId={String(id)} pageNum={Number(pageNum)} />
}

export default Manifest



