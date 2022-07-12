import React from "react"
import Placeholder from 'react-bootstrap/Placeholder'
import ItemCard from "../ItemCard/ItemCard"

interface MultiCardLoaderProps {
    count: number
}

const MultiCardLoader = ({ count }: MultiCardLoaderProps) => (
    <>
        {[...Array(count)].map((value, i) =>
            <Placeholder key={i} as={ItemCard} showPlaceholder={true} />
        )}

    </>
);

export default MultiCardLoader

