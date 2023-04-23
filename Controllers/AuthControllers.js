import fs from 'fs'

const Register=(req, res)=>{
    
    const {body} = req
    const {email, password, username}= body

    fs.readFile('database.json', (err, users)=>{
        if(err){
            return console.log(err)
        }
        let usersArr= JSON.parse(users)
        const isUser = usersArr.filter((e)=> e.email === email)
        if(isUser.length >0){
            return res.status(400).json({data: "email already exists"})
        }

        usersArr.push({email, password, username})
        fs.writeFile('database.json', JSON.stringify(usersArr), (err)=>{
            if(err) console.log(err)
            else {
                console.log("file written successfully")
            }
        })
        return res.status(200).json({data: "user added successfully"})
    })

}

const Login=(req, res)=>{
    const {body} = req
    const {email, password}= body
    fs.readFile('database.json',(err, users)=>{
        if(err){
            return console.log(err)
        }
        let usersArr= JSON.parse(users)
        if(!usersArr){
            return res.status(400).json({data: "empty database"})
        } 
        if(usersArr.find(user => (user.email === email) && user.password === password) ){
                   return (
                        req.session.userId = email,
                        res.status(200).json({data: `welcome ${email}`})
                   )
                } 
        return res.status(400).json({data: "invalid credentials"})
        
          
    })
}



const ForgotPassword=(req, res)=>{
    res.status(200).json({'data':"reset your password"})
    console.log("reset your password")
}



const AllUsers=(req, res)=>{
    fs.readFile('database.json', (err, users)=>{
        if(err){
            return console.log(err)
        }
        let usersArr= JSON.parse(users)
        res.status(200).json({usersArr})


    })
}



export  {Register, Login, ForgotPassword, AllUsers}
