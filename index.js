const express = require('express');
const Product = require('./model/product.model');
//Mongoose
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
})
app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})
mongoose.connect('mongodb+srv://suryacsework_db_user:2uwT2sDuwUVmGoGo@backendapi.wajtsvu.mongodb.net/?appName=BackendAPI').
    then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        })
    }).catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });