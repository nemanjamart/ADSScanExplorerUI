import Navbar from './Navbar/Navbar'
import Header from './Header/Header'
import Meta from './Meta/Meta'
import Footer from './Footer/Footer'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <>
            <Meta />
            <Navbar />
            <Header />
            <div className="min-h-screen">
                <main>{children}</main>
            </div>
            <Footer />
        </>
    )
}

export default Layout