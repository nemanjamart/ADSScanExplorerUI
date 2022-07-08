import Link from 'next/link'
import styles from './Page.module.css'
import PageType from '../../types/page'
import ItemCard from '../ItemCard/ItemCard'

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
            <div>
                <ItemCard title={`Page ${page.label}`} text={`Page ${page.volume_page_num} in ${page.journal}${page.volume}`} thumbnail={thumbnail} />
            </div>
        </Link>
    )
}

export default Page