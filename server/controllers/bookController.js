import { Book } from '../models/bookModel.js'
import mongoose from 'mongoose';

const getBooks = async (req, res, next) => {
    try {
        const books = await Book.find({}).sort({ createdAt: -1 });
        if (books) {
            return res.status(200).json(books)
        } throw new Error("Couldn't fetch data")
    } catch (error) {
        next(new Error(error.message, error.status))
    }
}

const createBook = async (req, res, next) => {
    try {
        const { title, author, publishYear } = req.body;
        if (!title || !author || !publishYear) {
            throw new Error('All fields required', 401)
        }
        const book = await Book.create({ title, author, publishYear });
        if (book) {
            return res.status(200).json({ message: 'Successfully added new book', book })
        }
        throw new Error('Book creation failed', 400)

    } catch (error) {
        next(new Error(error.message, error.status))
    }
}

const getBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID', 400)
        }
        const book = await Book.findById(id);
        if (book) {
            return res.status(200).json(book)
        } throw new Error('Book not found', 404)
    } catch (error) {
        next(new Error(error.message, error.status))
    }
}

const updateBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID', 400)
        }
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            throw new Error('All fields required', 401)
        }
        const book = await Book.findByIdAndUpdate(id, { ...req.body }, { new: true });
        if (book) {
            return res.status(200).json({ message: 'Book update successful', book })
        }
        throw new Error('Book update unsuccessful', 400)
    } catch (error) {
        next(new Error(error.message, error.status))
    }
}

const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID', 400)
        }
        const book = await Book.findByIdAndDelete(id);
        if (book) {
            return res.status(200).json({ message: 'Book successfully deleted', book })
        }
        throw new Error('Operation could not be performed', 400)
    } catch (error) {
        next(new Error(error.message, error.status))
    }
}

const controllers = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}

export default controllers;