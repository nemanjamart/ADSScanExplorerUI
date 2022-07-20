
import styles from './Header.module.css'
import Image from 'next/image'
import { Container } from 'react-bootstrap'

/**
 * Render the header component.
 */
const Header = () => {
    return (
        <header className={styles.container}>
            <Container className={styles.titlegroup}>
                <div className={styles.logoContainer}>
                    <Image className={styles.logo} src={`${process.env.NEXT_PUBLIC_BASE_PATH}/assets/ads.svg`} alt={"ADS logotype"} width={80} height={80} />
                </div>
                <p className={styles.titleText}>ADS Scan Explorer</p>
            </Container>
        </header>
    )
}

export default Header