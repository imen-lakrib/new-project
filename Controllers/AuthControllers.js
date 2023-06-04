import fs from 'fs'
import jwt from 'jwt'
// mongo
import UserModel from '../models/UserModel.js'

const Register = async(req, res) => {

    const { body } = req
    const { email, password, userName } = body
    if (!email || !password || !userName) {
        return res.status(400).json({data: "missing required fields"})
    }
    try {
        const adduser = await UserModel(body).save()
        if (!adduser){
            return res.status(400).json({data: "errror while creating user"})
        }
        return res.status(200).json({data:" successful "})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({data: error.message})
        
    }

    // fs.readFile('database.json', (err, users) => {
    //     if (err) {
    //         return console.log(err)
    //     }
    //     let usersArr = JSON.parse(users)
    //     const isUser = usersArr.filter((e) => e.email === email)
    //     if (isUser.length > 0) {
    //         return res.status(400).json({ data: "email already exists" })
    //     }

    //     usersArr.push({ email, password, username })
    //     fs.writeFile('database.json', JSON.stringify(usersArr), (err) => {
    //         if (err) console.log(err)
    //         else {
    //             console.log("file written successfully")
    //         }
    //     })
    //     return res.status(200).json({ data: "user added successfully" })
    // })

}

const Login = async(req, res) => {
    const { body } = req
    const { password, user } = body
    const filter = {
        $or: [
          { userName: user },
          { email: user }
        ]
      };
    if (!user || !password ) {
        return res.status(400).json({data: "missing required fields"})
    }
    try {
        const currentUser = await UserModel.findOne(filter)
        if (!currentUser){
            return res.status(400).json({data: "this user is not exist"})
        }
        if (password !== currentUser.password){
            return res.status(400).json({data:`error: wrong password`})
        }
        return res.status(200).json({data:`welcome mr: ${currentUser.userName}`})
        const userToken= {id: user._id}

        const token = jwt.sign(userToken, "Key")
        const decodedToken = jwt.verify(token, "Key")
        console.log(decodedToken)
        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({data: error.message})
        
    }

    // fs.readFile('database.json', (error, users) => {
    //     if (error) {
    //         return console.log(error)
    //     }
    //     let usersArr = JSON.parse(users)
    //     if (!usersArr) {
            
    //         return res.status(400).json({ data: "empty database" })
    //     }
    //     const user =  usersArr.find(user => (user.email === email || user.username === username))
    //     if ( user && user.password === password) {
    //         return (
    //             req.session.userId = email,
    //             req.session.username = email,

    //             res.status(200).json({ data: `welcome ${user.username}` })
    //         )
    //     }

    //     return res.status(400).json({ data: "invalid credentials" })


    // })
}


const LoginPage= (req, res)=>{
    res.render("login")  // the ejs file
}



const ForgotPassword = (req, res) => {
    res.status(200).json({ 'data': "reset your password" })
    console.log("reset your password")
}



const AllUsers = (req, res) => {
    fs.readFile('database.json', (err, users) => {
        if (err) {
            return console.log(err)
        }
        let usersArr = JSON.parse(users)
        res.status(200).json({ usersArr })


    })
}

const EditProfile = (req, res) => {
    const { body } = req
    const { email, username } = body
    /// check if the user logged in
    if (!req.session.userId) {
        return res.status(403).json({ message: "you can't edit profile before logged in" })
    }
    fs.readFile('database.json', (err, users) => {
        if (err) {
            return console.log(err)
        }
        let usersArr = JSON.parse(users)
        const editedUser = usersArr.find((user) => user.email === req.session.userId);
        if (editedUser) {
            editedUser.email = email;
            editedUser.username = username;

            fs.writeFile("database.json", JSON.stringify(usersArr), (err) => {
                if (err) console.log(err);
                else {
                    console.log("File written successfully");
                }
            });
            return res.status(200).json({ data: "You have successfully edited the user info" });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    });



}





export { Register, Login, ForgotPassword, AllUsers, EditProfile,LoginPage }
