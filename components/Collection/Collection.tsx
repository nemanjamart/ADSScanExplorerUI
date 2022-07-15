import CollectionType from '../../types/collection'
import styles from './Collection.module.css'
import ItemCard from '../ItemCard/ItemCard'

type CollectionProps = {
    collection: CollectionType
    thumbnail: string
    textQuery: string
}

const Collection = ({ collection, thumbnail, textQuery = '' }: CollectionProps) => {
    const query = textQuery ? `?full=${textQuery}` : ''
    const href = `${process.env.NEXT_PUBLIC_BASE_PATH}/manifest/${collection.id}${query}`

    return (
        <a href={href}>
            <div>
                <ItemCard title={`${collection.journal}${collection.volume}`} text={`${collection.pages} pages`} thumbnail={thumbnail} />
            </div>
        </a>
    )
}

export default Collection