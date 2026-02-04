const express = require('express');
require('dotenv').config();
const Product = require('./model/product.model');
const routes = require('./routes/product.route');
//Mongoose
const mongoose = require('mongoose');
const app = express();

const username = process.env.DB_Username;
const password = process.env.DB_Password;
const dbName = process.env.DB_Name;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/products', routes);

//To create a new product
app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//To get all products
app.get('/api/products', async (req, res) => {
    try {
        const product = await Product.find();
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})
//To get a single product
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})
//To delete a product
app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})
//To update a product
app.put('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})
mongoose.connect(`mongodb+srv://${username}:${password}@backendapi.wajtsvu.mongodb.net/${dbName}?appName=BackendAPI`).
    then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        })
    }).catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });