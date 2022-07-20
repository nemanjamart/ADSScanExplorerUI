import { FC } from 'react'
import styles from './Navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateBack } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Link from 'next/link'
import { Container, Navbar, Nav } from 'react-bootstrap'

interface AdsNavbarProps {
    adsUrl : string;
}

/**
 * Render the topmost navigation bar.
 */
const AdsNavbar: FC<AdsNavbarProps> = ({adsUrl = process.env.NEXT_PUBLIC_ADS_DEFAULT_URL}) => {
    return (
        <>
            <Navbar className={styles.navbarContainer} bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    <Link href="/" passHref>
                        <Navbar.Brand>
                            <div id={styles.brandContainer} >
                                <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH}/assets/ads.svg`} alt={"ADS logotype"} width={50} height={50} />
                                <h1><b>Scan Explorer</b></h1>
                            </div>
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className="justify-content-end ">
                        <Nav>
                            <Link href={adsUrl} passHref>
                                <Nav.Link>
                                    <FontAwesomeIcon icon={faRotateBack} />
                                    {' '}
                                    Return to ADS
                                </Nav.Link>
                            </Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default AdsNavbar