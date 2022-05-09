
import { NextApiResponse } from 'next';
import React, { useEffect, useState } from 'react';
import Link from 'next/link'


function SearchBox() {
    const [query, setQuery] = useState("");

    return (
        <div>
            <input type="text" className="input" placeholder="Search..." onChange={(e) => setQuery(e.target.value)} />
            <Link href='/search' as={`/search?bibcode=${query}`}>
                <button>Search</button>
            </Link>
        </div>
    )
}

export default SearchBox