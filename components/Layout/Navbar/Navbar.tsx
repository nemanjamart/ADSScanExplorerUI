import { FC } from 'react'
import styles from './Navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Link from 'next/link'

const Navbar: FC<{}> = () => {
    return (
        <div className={styles.container}>
            <Link href={'/'}>
                <a className={styles.homeButton}>
                    <div className={styles.logo}>
                        <Image src="/assets/ads.svg" alt={"ADS logotype"} width={80} height={80} layout='fill' objectFit='contain' />
                    </div>
                    <h1>
                        <b>ads</b>
                    </h1>
                </a>
            </Link>
            <ul>
                <li>
                    <button className={styles.button}>
                        <FontAwesomeIcon icon={faComment} />
                        Feedback
                    </button>
                </li>
                <li>
                    <button className={styles.button}>
                        <FontAwesomeIcon icon={faQuestionCircle} />
                        About
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Navbar