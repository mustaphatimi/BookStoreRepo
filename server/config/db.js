import mongoose from 'mongoose';

const dbUrl = "mongodb+srv://mustaphatimi_:AYvince98@mernapp.dis1mof.mongodb.net/BookStoreDB?retryWrites=true&w=majority"

export const connectDB = async function () {
    mongoose.set('strictQuery', false);

    await mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Database connection established');
    }).catch(e => {
        console.log(e)
    })
}