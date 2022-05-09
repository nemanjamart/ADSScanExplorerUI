import { FC } from 'react'
import styles from './Navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

const Navbar: FC<{}> = () => {
    return (
        <div className={styles.container}>
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