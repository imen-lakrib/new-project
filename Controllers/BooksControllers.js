import fs from 'fs'
import ejs from 'ejs'


const AllBooks = (req, res) => {
    fs.readFile('book.json', (err, books) => {
        if (err) {
            return res.status(500).json({ message: err })
        }
        if (!req.session.userId) {
            return res.status(403).json({ message: "you can't access to books list before logged in" })
        }
        let booksArr = JSON.parse(books)
        console.log(booksArr)

        res.render("listOfBooks",{booksArr} )

        // ejs.renderFile('listOfBooks.ejs',booksArr, (err, html) => {
        //     if (err) throw err;
        //     res.send(html);
        // });
        // return res.status(200).json({ booksArr })
    })
}

const EditBook = (req, res) => {
    const { body, params } = req
    const { isbn } = params
    const { country, imageLink, language, link, pages, title } = body
    if (!req.session.userId && !req.session.userName) {
        return res.status(403).json({ message: "you can't access to edit books before logged in" })
    }
    if (body.author !== req.session.userName) {
        return res.status(403).json({ message: "you cant edit book if you are not own it" })
    }
    fs.readFile('book.json', (err, books) => {

        let booksArr = JSON.parse(books)
        const currentBook = booksArr.find((book) => book.isbn === isbn)

        if (currentBook) {
            currentBook.country = country
            currentBook.imageLink = imageLink
            currentBook.language = language
            currentBook.link = link
            currentBook.pages = pages
            currentBook.title = title
        }
        fs.writeFile("book.json", JSON.stringify(booksArr), (err) => {
            if (err) console.log(err);
            else {
                console.log("File written successfully");
            }
        })
        return res.status(200).json({ data: "You have successfully edited the book " });


    })

}


const AddBook = (req, res) => {

    const { body } = req
    const { isbn, country, imageLink, language, link, pages, title, year } = body
    if (!req.session.userId && !req.session.userName) {
        return res.status(403).json({ message: "you can't access to books list before logged in" })
    }
    fs.readFile('book.json', (err, books) => {
        let booksArr = JSON.parse(books)
        const isBook = booksArr.filter((e) => e.isbn === isbn)
        if (isBook.length > 0) {
            return res.status(400).json({ data: "this book already exists" })
        }
        const author = req.session.userName
        console.log(req.session)
        booksArr.push({ author, isbn, country, imageLink, language, link, pages, title, year })
        fs.writeFile('book.json', JSON.stringify(booksArr), (err) => {
            if (err) console.log(err)

        })
        return res.status(200).json({ data: isBook })



    })

}

const RemoveBook = (req, res) => {
    const { params } = req
    const { isbn } = params
    fs.readFile('book.json', (err, books) => {
        // verify the !session => 403: please login

        if (!req.session.userId) {
            return res.status(403).json({ message: "you can't access to books list before logged in" })
        }
        let booksArr = JSON.parse(books)
        const isBook = booksArr.filter((book) => book.isbn !== isbn)
        booksArr = isBook
        fs.writeFile("book.json", JSON.stringify(booksArr), (err) => {
            if (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ message: "error occurred while removing the book" });
            }
        })
        return res.status(200).json({ data: "you remove a book" })


    })

}

const GetOneBook = (req, res) => {
    const { params } = req
    const { isbn } = params


    fs.readFile('book.json', (err, books) => {

        // if (!req.session.userId) {
        //     return res.status(403).json({ message: "you can't access to books list before logged in" })
        // }
        let booksArr = JSON.parse(books)
        const myBook = booksArr.filter((book) => book.isbn === isbn)
        if (myBook.length === 0) {
            return res.status(404).json({ message: "book not found" })
        }
        console.log(myBook)


        ejs.renderFile('singleBook.ejs',myBook[0], (err, html) => {
            if (err) throw err;
            res.send(html);
        });


    })


}

export { AllBooks, AddBook, RemoveBook, EditBook, GetOneBook }