
import React from 'react';
import styles from './SearchExample.module.css'


interface SearchExampleProps {
    onExampleSelected: (example: string) => void
}

const SearchExample = ({ onExampleSelected }: SearchExampleProps) => {
    return (
        <div className={styles.container}>
            <p>Search examples</p>
            <hr className={styles.divider} />
            <DescriptionListItem onExampleSelected={onExampleSelected} title={"publication"} example={"bibstem:ApJ"} />
        </div>
    )
}

interface DescriptionListItem {
    onExampleSelected: (example: string) => void
    title: string
    example: string
}

const DescriptionListItem = ({ onExampleSelected, title, example }: DescriptionListItem) => {
    return (
        <dl className={styles.descriptionList}>
            <dt>{title}</dt>
            <dd >
                <DescriptionListButton onExampleSelected={onExampleSelected} example={example} />
            </dd>
        </dl>)
}

interface DescriptionListButtonProps {
    onExampleSelected: (example: string) => void
    example: string
}
const DescriptionListButton = ({ onExampleSelected, example }: DescriptionListButtonProps) => {
    return (<button className={styles.textLinkButton} onClick={() => onExampleSelected(example)} >
        {example}
    </button>)
}


export default SearchExample