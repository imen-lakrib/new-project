import express from 'express';
import  { AddBook, AllBooks, EditBook, RemoveBook } from '../Controllers/BooksControllers.js'

const BooksRoutes = express.Router()


BooksRoutes.get("/all", AllBooks)
BooksRoutes.post("/addBook", AddBook)
BooksRoutes.delete("/removeBook", RemoveBook)
BooksRoutes.put("/editBook", EditBook)

export default BooksRoutes


