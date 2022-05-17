import Link from 'next/link'
import SearchItemType from '../../types/search-item'
import styles from './SearchItem.module.css'
import Image from 'next/image'

type ArticleProps = {
    item: SearchItemType
}

const Layout = ({ item }: ArticleProps) => {

    return (
        <Link href={`/${item.type}/${item.id}`} >
            <div className={styles.card}>
                <div className={styles.grid}>
                    <Image className={styles.thumbnail} src={item.thumbnail} alt="" width={400} height={200} />
                    <h2>{item.bibcode}</h2>
                    <p>{item.pages} pages</p>
                </div>
            </div>
        </Link>
    )
}

export default Layout