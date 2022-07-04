import Navbar from './Navbar/Navbar'
import Header from './Header/Header'
import Meta from './Meta/Meta'
import Footer from './Footer/Footer'
import styles from './Layout.module.css'
import AlertBanner from './AlertBanner/AlertBanner'

type Props = {
    showHeader?: boolean
    children: React.ReactNode
}

const Layout = ({ showHeader = false, children }: Props) => {
    return (
        <>
            <Meta />
            <Navbar />
            <AlertBanner />
            {showHeader ? <Header /> : ''}
            <main className={styles.mainContent}>{children}</main>
            {/* <Footer /> */}
        </>
    )
}

export default Layout