import fs from 'fs'

const AllBooks = (req, res) => {
    fs.readFile('book.json', (err, books) => {
        if (err) {
            return console.log(err)
        }
        if (!req.session.userId) {
            return res.status(403).json({ message: "you can't access to books list before logged in" })
        }
        let booksArr = JSON.parse(books)
        return res.status(200).json({ booksArr })


    })
}


const AddBook = (req, res) => {

    const { body } = req
    const { title, author, description } = body
    fs.readFile('book.json', (err, books) => {

        if (!req.session.userId) {
            return res.status(403).json({ message: "you can't access to books list before logged in" })
        }
        let booksArr = JSON.parse(books)

        const isBook = booksArr.filter((e) => e.title === title)
        if (isBook.length > 0) {
            return res.status(400).json({ data: "this book already exists" })
        }

        booksArr.push({ title, author, description })
        fs.writeFile('book.json', JSON.stringify(booksArr), (err) => {
            if (err) console.log(err)
            else {
                return console.log("file written successfully")
            }
        })
        return res.status(200).json({ data: "this book added successfully" })



    })

}

const RemoveBook=(req, res)=>{
    const { body } = req
    const { title, author, description } = body
    fs.readFile('boos.json', (err, books)=>{
        // verify the !session => 403: please login
        
        if (!req.session.userId) {
            return res.status(403).json({ message: "you can't access to books list before logged in" })
        }
        let booksArr = JSON.parse(books)

        const isBook = booksArr.filter((e) => e.title === title && e.author === author && e.description === description)
        if (isBook.length > 0) {
            return res.status(400).json({ data: "this book already exists" })
        }

    })

}

export { AllBooks, AddBook ,RemoveBook}