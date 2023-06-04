import express from 'express';
import bodyParser from 'body-parser';
import http from 'http'
import session from 'express-session'


//db
import db from "mongodb"
import mongoose from 'mongoose';

// routes 
import AuthRoutes from './Routes/AuthRoutes.js'
import BooksRoutes from './Routes/BooksRoutes.js';

const app = express()



http.createServer(app)
app.use(bodyParser.json())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.set("view engine", "ejs")

// app.use(express.static(`${__dirname}/public`))

// api routes:
app.use("/auth", AuthRoutes)
app.use("/books", BooksRoutes)



// test mongo db:
mongoose.connect("mongodb://127.0.0.1:27017/bookStore")
.then((r)=>{
  console.log("mongo connected")
})
.catch(err =>{
  console.log(err)
})





// server port
app.listen(3000, () => {
  console.log('listening on port : 3000')
})