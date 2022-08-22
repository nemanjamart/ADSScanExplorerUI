import CollectionType from '../../types/collection'
import styles from './Collection.module.css'
import ItemCard from '../ItemCard/ItemCard'

type CollectionProps = {
    collection: CollectionType
    thumbnail: string
    textQuery: string
}

/**
 * Collection component used to visualize a collection search result 
 */
const Collection = ({ collection, thumbnail, textQuery = '' }: CollectionProps) => {
    const query = textQuery ? `?full=${textQuery}` : ''
    const href = `/manifest/${collection.id}${query}`

    return (
        <ItemCard title={`${collection.journal}${collection.volume}`} text={`${collection.pages} pages`} thumbnail={thumbnail} href={href}/>
    )
}

export default Collection