import Navbar from './Navbar/Navbar'
import Header from './Header/Header'
import Meta from './Meta/Meta'
import Footer from './Footer/Footer'

type Props = {
    showHeader?: boolean
    children: React.ReactNode
}

const Layout = ({ showHeader = false, children }: Props) => {
    return (
        <>
            <Meta />
            <Navbar />
            {showHeader ? <Header /> : ''}
            <div className="min-h-screen">
                <main>{children}</main>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default Layout