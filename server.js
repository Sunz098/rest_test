// server.js

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



app.get('/', (req, res) => {
  res.send('EIEI')
})

const books = require('./db')
app.get('/books', (req, res) => {
  res.json(books)
})

app.get('/books/:id', (req, res) => {
    res.json(books.find(book => book.id === req.params.id))
})

app.put('/books/:id', (req, res) => {
    const updateIndex = books.findIndex(book => book.id === req.params.id);
    res.json(Object.assign(books[updateIndex], req.body))
})

app.delete('/books/:id', (req, res) => {
    const deletedIndex = books.findIndex(book => book.id === req.params.id)
    delete books[deletedIndex];
    res.status(200).json(req.body)
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})

app.post('/books', (req, res) => {
    books.push(req.body)
    res.status(200).json(req.body)
  })

