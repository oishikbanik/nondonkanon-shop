import express from 'express';
import Product from '../models/Product';
import { auth, adminAuth } from '../middleware/auth';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// Admin: Create product
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, stock } = req.body;
    const product = new Product({
      name,
      description,
      price,
      category,
      imageUrl,
      stock,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
});

// Admin: Update product
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

// Admin: Delete product
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

export default router;
