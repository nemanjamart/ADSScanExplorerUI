
import React from 'react';
import styles from './SearchExample.module.css'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
interface SearchExampleProps {
    onExampleSelected: (example: string) => void
}

const SearchExample = ({ onExampleSelected }: SearchExampleProps) => {
    return (
        <Card id={styles.container}>
            <Card.Header>Search examples</Card.Header>
            <ListGroup variant="flush">
                <ExampleListItem onExampleSelected={onExampleSelected} title={"Publication"} example={"bibstem:ApJ"} />
                <ExampleListItem onExampleSelected={onExampleSelected} title={"Volume"} example={"bibstem:ApJ volume:333"} />
                <ExampleListItem onExampleSelected={onExampleSelected} title={"Article"} example={"bibcode:1988ApJ...333L..69M"} />
                <ExampleListItem onExampleSelected={onExampleSelected} title={"Page type"} example={"bibstem:adga pagetype:FrontMatter"} />
                <ExampleListItem onExampleSelected={onExampleSelected} title={"Full text"} example={"full:\"infrared\""} />
            </ListGroup>
        </Card>
    )
}

interface ExampleListItemProps {
    onExampleSelected: (example: string) => void
    title: string
    example: string
}

const ExampleListItem = ({ onExampleSelected, title, example }: ExampleListItemProps) => {
    return (
        <Row className='g-0'>
            <Col>
                <ListGroup.Item variant='secondary'><b>{title}</b></ListGroup.Item>
            </Col>
            <Col>
                <ListGroup.Item className={styles.searchExampleAction} variant='light' action onClick={() => onExampleSelected(example)} >
                    {example}
                </ListGroup.Item>
            </Col>
        </Row>
    )
}



export default SearchExample