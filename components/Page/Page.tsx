import Link from 'next/link'
import styles from './Page.module.css'
import Image from 'next/image'
import PageType from '../../types/page'

type PageProps = {
    page: PageType
}

const Page = ({ page }: PageProps) => {

    return (
        <Link href={`/manifest/${page.journal_volume_id}/${page.volume_page_num}/`} >
            <div className={styles.card}>
                <div className={styles.grid}>
                    <Image className={styles.thumbnail} src={page.thumbnail} alt="" width={400} height={200} />
                    <h2>Page {page.label}</h2>
                    <p>Page in volume {page.volume_page_num}</p>
                </div>
            </div>
        </Link>
    )
}

export default Page