require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Atlas Connected!'))
    .catch(err => console.error('DB Error:', err));

// Mongoose Schema
const productSchema = new mongoose.Schema({
    category: String,
    title: String,
    price: String,
    mainImg: String,
    angles: [String],
    desc: String
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// ================= API ENDPOINTS =================

// 1. Get All Products
app.get('/api/products', async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};
        if (category && category !== 'all') {
            query.category = category;
        }
        const products = await Product.find(query).sort({ createdAt: -1 });
        res.json({ success: true, data: products });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 2. Add New Product
app.post('/api/products', async (req, res) => {
    try {
        const newProd = new Product(req.body);
        await newProd.save();
        res.json({ success: true, message: "Product Saved!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 3. Update Product
app.put('/api/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.json({ success: true, message: "Product Updated!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 4. Delete Product
app.delete('/api/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Product Deleted!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));