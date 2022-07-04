import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useError from '../../../hooks/useAlert';
import styles from './AlertBanner.module.css'

const AlertBanner = () => {

    const { alert, removeAlert } = useError();

    if (!alert || !alert.message) {
        return <></>
    }

    return (
        <div className={styles.container} id={alert && alert.isError ? styles.error : styles.message}>
            {alert && alert.message && <p className={styles.alert}>({alert.message})</p>}
            <button className={styles.button} onClick={() => removeAlert()}>
                <FontAwesomeIcon icon={faClose} inverse />
            </button>
        </div>
    )
}

export default AlertBanner

