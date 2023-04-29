import express from 'express';
import  { AddBook, AllBooks, EditBook, RemoveBook,GetOneBook } from '../Controllers/BooksControllers.js'

const BooksRoutes = express.Router()


BooksRoutes.get("/all", AllBooks)
BooksRoutes.post("/addBook", AddBook)
BooksRoutes.delete("/removeBook/:isbn", RemoveBook)
BooksRoutes.put("/editBook/:isbn", EditBook)
BooksRoutes.get("/:isbn", GetOneBook)

export default BooksRoutes


