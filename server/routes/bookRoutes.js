import express from 'express';
import controllers from '../controllers/bookController.js';

const router = express.Router();

router.route('/')
    .get(controllers.getBooks)
    .post(controllers.createBook)

router.route('/:id')
    .get(controllers.getBook)
    .put(controllers.updateBook)
    .delete(controllers.deleteBook)

export default router;