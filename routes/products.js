const express = require('express')
const router = express.Router()

// get all products
router.get('/', (req, res) => {
  res.send('Get all products')
})
// get one product
router.get('/:id', (req, res) => {
  res.send('Get one product')
})  

// create one product
router.post('/', (req, res) => {
  res.send('Create one product')
})

// patch one product
router.patch('/:id', (req, res) => {
  res.send('Patch one product')
})

// delete one product
router.delete('/:id', (req, res) => {
  res.send('Delete one product')
})

module.exports = router
