import express from 'express';
import  { AddBook, AllBooks, RemoveBook } from '../Controllers/BooksControllers.js'

const BooksRoutes = express.Router()


BooksRoutes.get("/all", AllBooks)
BooksRoutes.post("/addBook", AddBook)
BooksRoutes.delete("/removeBook", RemoveBook)

export default BooksRoutes


