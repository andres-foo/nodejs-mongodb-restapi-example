const express = require('express')
const router = express.Router()
const Product = require('../models/product')

// get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.json({ success:true, data: products})
  } catch(err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// get one product
router.get('/:id', getProduct, (req, res) => {
  res.json({ success:true, data: req.product })
})  

// create one product
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  })
  try {
    const newProduct = await product.save()
    res.status(201).json({ success: true, data: newProduct })
  } catch(err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// patch one product
router.patch('/:id', getProduct, async (req, res) => {
  if(req.body.name != null) {
    req.product.name = req.body.name 
  }
  if(req.body.description != null) {
    req.product.description = req.body.description 
  }
  if(req.body.price != null) {
    req.product.price = req.body.price 
  }
  try {
    const patchedProduct = await req.product.save()
    res.json({ success: true, data: patchedProduct })
  } catch(err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// delete one product
router.delete('/:id', getProduct, async (req, res) => {
  try {
    await req.product.remove()
    res.json({ success: true, message: 'Product removed' })
  } catch(err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// atach product to request
async function getProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id)
    req.product = product
    next()
  } catch(err) {
    res.status(400).send({ success: false, message: 'Product not found' })
  }
}

module.exports = router
