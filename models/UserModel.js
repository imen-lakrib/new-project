import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    userName:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
    },
    name:{
        type: String,
    },


})

export default mongoose.model('users', UserModel)