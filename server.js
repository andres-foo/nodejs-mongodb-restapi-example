require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// constants
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '127.0.0.1'
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/products'

// database connection
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.on('open', () => console.log('Connected to database'))

// middleware
app.use(express.json())
app.use('/api/products', require('./routes/products'))

// start
app.listen(PORT, HOST, () => {
  console.log(`Listening on http://${HOST}:${PORT}`)
})
