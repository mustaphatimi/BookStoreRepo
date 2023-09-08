import React, { useState } from 'react';
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';


const CreateBook = () => {
    const [book, setBook] = useState({ title: '', author: '', publishYear: '' })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await fetch('http://localhost:5000/books', {
            method: 'POST',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            const data = res.json()
            return data
        }).then((data) => {
            setLoading(false)
            enqueueSnackbar(data.message, { variant: 'success' })
            navigate(`/books/${data.book._id}`)
        }).catch((err) => {
            setLoading(false)
            enqueueSnackbar(err.message, { variant: 'error' })
        })
    }

    const handleChange = (e) => {
        setBook((book) => {
            return {
                ...book,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className="text-3x1 my-4">
                Create Book
            </h1>
            {loading ? (
                <Spinner />
            ) : " "}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className="my-4">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="" className='text-xl text-gray-500'>Title</label>
                        <input type="text"
                            name='title'
                            value={book.title}
                            onChange={handleChange}
                            className='border-2 border-gray-500 px-4 py-2 w-full'
                        />
                        <label htmlFor="" className='text-xl text-gray-500'>Author</label>
                        <input type="text"
                            name='author'
                            value={book.author}
                            onChange={handleChange}
                            className='border-2 border-gray-500 px-4 py-2 w-full'
                        />
                        <label htmlFor="" className='text-xl text-gray-500'>Publish Year</label>
                        <input type="text"
                            name='publishYear'
                            value={book.publishYear}
                            onChange={handleChange}
                            className='border-2 border-gray-500 px-4 py-2 w-full'
                        />
                        <button className='p-2 bg-sky-300 m-8'>
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateBook