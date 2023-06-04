import express from 'express';
import  { Login, Register, ForgotPassword,AllUsers, EditProfile,LoginPage } from '../Controllers/AuthControllers.js'


const AuthRoutes = express.Router()

AuthRoutes.post("/register", Register)
AuthRoutes.post("/login", Login)
// login page ejs:
AuthRoutes.get("/login", LoginPage)
AuthRoutes.post("/forgotpassword", ForgotPassword)

AuthRoutes.get("/allusers", AllUsers)
AuthRoutes.put("/editprofile/:isbn", EditProfile)


export default AuthRoutes



