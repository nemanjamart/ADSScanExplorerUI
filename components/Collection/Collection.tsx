import Link from 'next/link'
import CollectionType from '../../types/collection'
import styles from './Collection.module.css'
import ProtectedImage from '../ProtectedImage/ProtectedImage'
import Card from 'react-bootstrap/Card'
import ItemCard from '../ItemCard/ItemCard'

type CollectionProps = {
    collection: CollectionType
    thumbnail: string
    textQuery: string
}

const Collection = ({ collection, thumbnail, textQuery = '' }: CollectionProps) => {

    return (
        <Link href={{ pathname: `/manifest/${collection.id}`, query: textQuery ? { full: textQuery } : '' }} >
            <div>
                <ItemCard title={`${collection.journal}${collection.volume}`} text={`${collection.pages} pages`} thumbnail={thumbnail} />
            </div>
        </Link>
    )
}

export default Collection