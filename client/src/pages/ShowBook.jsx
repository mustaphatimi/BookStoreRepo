import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const ShowBook = () => {

    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);

    const { id } = useParams()

    useEffect(() => {
        setLoading(true)
        const getBook = async () => {
            const res = await fetch(`http://localhost:5000/books/${id}`)
            const data = await res.json();
            return data
        }
        getBook()
            .then((data) => {
                setBook(data)
                setLoading(false)
            }).catch((err) => {
                setBook({})
                setLoading(false)
                console.log(err.message)
            })
    }, [])
    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3x1 my-4'>Show Book</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">Id</span>
                        <span>{book._id}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">Title</span>
                        <span>{book.title}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">Author</span>
                        <span>{book.author}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">Publish Year</span>
                        <span>{book.publishYear}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">Created</span>
                        <span>{new Date(book.createdAt).toDateString()}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">Last updated</span>
                        <span>{new Date(book.updatedAt).toDateString()}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShowBook