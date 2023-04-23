import express from 'express';
import  { Login, Register, ForgotPassword,AllUsers, EditProfile } from '../Controllers/AuthControllers.js'


const AuthRoutes = express.Router()


AuthRoutes.post("/register", Register)
AuthRoutes.post("/login", Login)
AuthRoutes.post("/forgotpassword", ForgotPassword)
AuthRoutes.get("/allusers", AllUsers)
AuthRoutes.put("/editprofile", EditProfile)


export default AuthRoutes



