
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
            <div className={styles.descriptionListGrid}>
                <DescriptionListItem onExampleSelected={onExampleSelected} title={"publication"} example={"bibstem:ApJ"} />
                <DescriptionListItem onExampleSelected={onExampleSelected} title={"volume"} example={"bibstem:ApJ volume:333"} />
                <DescriptionListItem onExampleSelected={onExampleSelected} title={"article"} example={"bibcode:1988ApJ...333L..69M"} />
                <DescriptionListItem onExampleSelected={onExampleSelected} title={"page type"} example={"bibstem:adga pagetype:FrontMatter"} />
                <DescriptionListItem onExampleSelected={onExampleSelected} title={"full text"} example={"full:\"infrared\""} />
            </div>
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
        <dl className={styles.descriptionListItem}>
            <dt className={styles.descriptionListTitle}>{title}</dt>
            <dd className={styles.descriptionListValue}>
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