
import styles from './Header.module.css'
import Image from 'next/image'

const Header = () => {
    return (
        <header className={styles.container}>
            <div className={styles.titlegroup}>
                <div className={styles.logoContainer}>
                    <Image className={styles.logo} src={`${process.env.NEXT_PUBLIC_BASE_PATH}/assets/ads.svg`} alt={"ADS logotype"} width={80} height={80} />
                </div>
                <text>ADS Scan Explorer</text>
            </div>
        </header>
    )
}

export default Header