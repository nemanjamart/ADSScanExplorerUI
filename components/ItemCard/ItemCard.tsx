import styles from './ItemCard.module.css'
import ProtectedImage from '../ProtectedImage/ProtectedImage'
import Card from 'react-bootstrap/Card'
import Placeholder from 'react-bootstrap/Placeholder'
import ImageLoader from '../ContentLoader/ImageLoader'

type ItemCardProps = {
    title?: string
    text?: string
    thumbnail?: string
    placeholder?: boolean
}

const ItemCard = ({ title, text, thumbnail, placeholder = false }: ItemCardProps) => {
    const PH = () => {
        return <>
            <Card.Img as={ImageLoader} width={400} height={200} />
            <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />
                </Placeholder>
            </Card.Body>
        </>
    }

    const IC = () => {
        return <>
            <Card.Img className={styles.thumbnail} variant="top" src={thumbnail} alt="Thumbnail" width={400} height={200} as={ProtectedImage} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{text}</Card.Text>
            </Card.Body>
        </>
    }

    return (
        <Card className={styles.card}>
            {placeholder ? PH() : IC()}
        </Card>
    )
}




export default ItemCard