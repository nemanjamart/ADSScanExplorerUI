import Link from 'next/link'
import styles from './Page.module.css'
import PageType from '../../types/page'
import ProtectedImage from '../ProtectedImage/ProtectedImage'

type PageProps = {
    page: PageType
    thumbnail: string
    textQuery: string
}

const Page = ({ page, textQuery, thumbnail }: PageProps) => {
    const query = {
        p: page.volume_page_num,
        full: textQuery
    }

    for (const key of Object.keys(query)) {
        if (!query[key] || query[key] == "") {
            delete query[key]
        }
    }

    return (
        <Link href={{ pathname: `/manifest/${page.collection_id}`, query: query }} >
            <div className={styles.card}>
                <div className={styles.grid}>
                    <ProtectedImage className={styles.thumbnail} src={thumbnail} alt="Page thumbnail" width={400} height={200} />
                    <h2>Page {page.label}</h2>
                    <p>Page {page.volume_page_num} in {page.journal}{page.volume} </p>
                </div>
            </div>
        </Link>
    )
}

export default Page