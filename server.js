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

// ================= MONGOOSE SCHEMAS =================

// 1. Product Schema
const productSchema = new mongoose.Schema({
    category: String,
    title: String,
    price: String,
    mainImg: String,
    angles: [String],
    desc: String
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// 2. Banner Schema (NEW ADDITION)
const bannerSchema = new mongoose.Schema({
    imageUrl: String,
    linkUrl: String
}, { timestamps: true });

const Banner = mongoose.model('Banner', bannerSchema);

// ================= PRODUCT API ENDPOINTS =================

// Get All Products
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

// Add New Product
app.post('/api/products', async (req, res) => {
    try {
        const newProd = new Product(req.body);
        await newProd.save();
        res.json({ success: true, message: "Product Saved!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Update Product
app.put('/api/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.json({ success: true, message: "Product Updated!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Delete Product
app.delete('/api/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Product Deleted!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ================= BANNER API ENDPOINTS (NEW ADDITION) =================

// 1. Get All Banners
app.get('/api/banners', async (req, res) => {
    try {
        const banners = await Banner.find().sort({ createdAt: -1 });
        res.json({ success: true, data: banners });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 2. Add New Banner
app.post('/api/banners', async (req, res) => {
    try {
        const newBanner = new Banner({
            imageUrl: req.body.imageUrl || req.body.image || req.body.bannerImg,
            linkUrl: req.body.linkUrl || req.body.link || "#collections"
        });
        await newBanner.save();
        res.json({ success: true, message: "Banner Uploaded!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 3. Delete Banner
app.delete('/api/banners/:id', async (req, res) => {
    try {
        await Banner.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Banner Deleted!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ================= SERVER START =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
