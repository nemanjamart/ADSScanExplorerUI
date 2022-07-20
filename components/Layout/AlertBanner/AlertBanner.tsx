import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAlert from '../../../hooks/useAlert';
import styles from './AlertBanner.module.css'


/**
 * Show an alert banner when an alert or error is added to the alert provider.
 */
const AlertBanner = () => {

    const { alert, removeAlert } = useAlert();

    if (!alert || !alert.message) {
        return <></>
    }

    return (
        <div className={styles.container} id={alert && alert.isError ? styles.error : styles.message}>
            <p className={styles.alert}>{alert.message}</p>
            <button className={styles.button} onClick={() => removeAlert()}>
                <FontAwesomeIcon icon={faClose} size="lg"/>
            </button>
        </div>
    )
}

export default AlertBanner

