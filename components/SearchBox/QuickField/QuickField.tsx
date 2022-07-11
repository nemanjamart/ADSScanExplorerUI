

import React from 'react';
import styles from './QuickField.module.css'
import SearchTermsDropdown from './SearchTermsDropdown';

interface QuickFieldProps {
    onClick(field: string);
}

const QuickField = ({ onClick }: QuickFieldProps) => {
    return <div className={styles.quickFieldContainer}>
        <ul>
            <li>
                QUICK FIELD:
            </li>
            <li className='d-none d-lg-inline'>
                <a className={styles.quickFieldItem} onClick={() => onClick("bibstem:\"\"")}>
                    Publication
                </a>
            </li>
            <li className='d-none d-lg-inline'>
                <a className={styles.quickFieldItem} onClick={() => onClick("bibcode:\"\"")}>
                    Article
                </a>
            </li>
            <li className='d-none d-lg-inline'>
                <a className={styles.quickFieldItem} onClick={() => onClick("pagetype:\"\"")}>
                    Page type
                </a>
            </li>
            <li className='d-none d-lg-inline'>
                <a className={styles.quickFieldItem} onClick={() => onClick("full:\"\"")}>
                    Content
                </a>
            </li>
            <li>
                <SearchTermsDropdown onClick={onClick}/>
            </li>
        </ul>
    </div>
}


export default QuickField