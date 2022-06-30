import Link from 'next/link'
import CollectionType from '../../types/collection'
import styles from './Collection.module.css'
import ProtectedImage from '../ProtectedImage/ProtectedImage'

type CollectionProps = {
    collection: CollectionType
    thumbnail: string
    textQuery: string
}

const Collection = ({ collection, thumbnail, textQuery = '' }: CollectionProps) => {

    return (
        <Link href={{pathname: `/manifest/${collection.id}`, query: textQuery ? { full: textQuery } : ''}} >
            <div className={styles.card}>
                <div className={styles.grid}>
                    <ProtectedImage className={styles.thumbnail} src={thumbnail} alt="Collection thumbnail" width={400} height={200}/>
                    <h2>{collection.journal}{collection.volume}</h2>
                    <p>{collection.pages} pages</p>
                </div>
            </div>
        </Link>
    )
}

export default Collection