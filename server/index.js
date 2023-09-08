import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors'
import { connectDB } from './config/db.js';
import bookRoutes from './routes/bookRoutes.js'


const port = process.env.PORT;
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.status(234).send('Welcome to the BookStore MERN Stack tutorial!')
})
app.use('/books', bookRoutes)

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
})



app.use((err, req, res, next) => {
    const { message = 'Server Error', status = 500 } = err;
    res.status(status).json({ error: message })
})
