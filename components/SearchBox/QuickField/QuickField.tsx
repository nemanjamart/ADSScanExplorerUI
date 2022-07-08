

import React from 'react';
import styles from './QuickField.module.css'
import DropdownButton from 'react-bootstrap/DropdownButton'

interface QuickFieldProps {
    onClick(field: string);
}

const QuickField = ({ onClick }: QuickFieldProps) => {
    return <div className={styles.quickFieldContainer}>
        <ul>
            <li>
                QUICK FIELD:
            </li>
            <li>
                <a className={styles.quickFieldItem} onClick={() => onClick("bibstem:\"\"")}>
                    Publication
                </a>
            </li>
            <li>
                <a className={styles.quickFieldItem} onClick={() => onClick("bibcode:\"\"")}>
                    Article
                </a>
            </li>
            <li>
                <a className={styles.quickFieldItem} onClick={() => onClick("pagetype:\"\"")}>
                    Page type
                </a>
            </li>
            <li>
                <a className={styles.quickFieldItem} onClick={() => onClick("full:\"\"")}>
                    Content
                </a>
            </li>
        </ul>
    </div>
}


export default QuickField