import Navbar from './Navbar/Navbar'
import Header from './Header/Header'
import Meta from './Meta/Meta'
import Footer from './Footer/Footer'
import styles from './Layout.module.css'
import AlertBanner from './AlertBanner/AlertBanner'
import { Container } from 'react-bootstrap'

type Props = {
    showHeader?: boolean
    children: React.ReactNode
    adsUrl?: string
}

/**
 * Layout component containing all custom components used to render this app.
 */
const Layout = ({ showHeader = false, children, adsUrl }: Props) => {
    return (
        <>
            <Meta />
            <Navbar adsUrl={adsUrl}/>
            <AlertBanner />
            {showHeader ? <Header /> : ''}
            <Container className="d-flex flex-column h-100 pt-2 m-0" fluid>{children}</Container>
            {/* <Footer /> */}
        </>
    )
}

export default Layout