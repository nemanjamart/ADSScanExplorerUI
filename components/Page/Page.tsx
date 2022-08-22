import styles from './Page.module.css'
import PageType from '../../types/page'
import ItemCard from '../ItemCard/ItemCard'

type PageProps = {
    page: PageType
    thumbnail: string
    textQuery: string
}

/**
 * Page component used to visualize a page search result 
 */
const Page = ({ page, textQuery, thumbnail }: PageProps) => {
    const query = `?p=${page.volume_page_num}` + (textQuery ? `&full=${textQuery}` : '')
    const href = `/manifest/${page.collection_id}${query}`

    return (
        <ItemCard title={`Page ${page.label}`} text={`Page ${page.volume_page_num} in ${page.journal}${page.volume}`} thumbnail={thumbnail} href={href}/>
    )
}

export default Page