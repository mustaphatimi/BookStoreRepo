import React from 'react'
import BookCard from './BookCard';

const BooksCard = ({ books }) => {
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {books.map((item) => (
                <BookCard key={item._id} book={item} />
            ))}
        </div>
    )
}

export default BooksCard;