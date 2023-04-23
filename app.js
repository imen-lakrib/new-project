import express from 'express';
import bodyParser from 'body-parser';
import http from 'http'
import session from 'express-session'

// routes 
import AuthRoutes from './Routes/AuthRoutes.js'
import BooksRoutes from './Routes/BooksRoutes.js';

const app= express()

http.createServer(app)
app.use(bodyParser.json())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))



// api routes:
app.use("/auth",AuthRoutes )
app.use("/books",BooksRoutes )





// server port
app.listen(3000, ()=>{
    console.log('listening on port : 3000')
})