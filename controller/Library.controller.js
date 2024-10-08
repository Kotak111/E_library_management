const Library = require("../models/Library.model");
const fs = require("fs")
const path=require("path")


//create A book
exports.CreateBook = async (req, res) => {
    try {
        const { title, description, public_date, language, size, category } = req.body;


        let author;
        try {
            author = JSON.parse(req.body.author);
        } catch (error) {
            return res.status(400).json({ message: 'Invalid author format. Author must be valid JSON.' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'PDF file is required' });
        }

        const newBook = new Library({
            title,
            description,
            public_date,
            language,
            size,
            author,
            pdf: req?.file?.path,
            category,
            createdBy: req.user.id,
        });

         await newBook.save();

        res.status(201).json({
            message: 'Book added successfully!',
            success: true
        });

    } catch (error) {
        console.error('Error inserting book:', error);
        // res.status(500).json({ message: 'An error occurred while adding the book', error });
    }
};

//Get All Book
exports.GetAllBook = async (req, res) => {
    try {
        const BookFind = await Library.find().populate('createdBy', 'username email')
            .exec();
        if (BookFind.length > 0) {
            res.json({
                success: true,
                BookFind: BookFind
            });
        } else {
            return res.json({
                success: false,
                message: "No Book found",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}

// Get By Id Book
exports.GetByIdBook = async (req, res) => {
    try {
        const BookGet = await Library.findById(req.params.id).populate('createdBy', 'username email')
        if (BookGet) {
            res.json({
                success: true,
                BookGet: BookGet
            })
        }
    } catch (error) {
        console.log(error);

    }
}


//Delete A book

exports.DeleteBook = async (req, res) => {
    try {

        let find = await Library.findById(req.params.id);

        if (!find) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }


        const pdfPath = path.join(__dirname, '..', find.pdf);


        fs.unlink(pdfPath, async (err) => {
            if (err) {
                console.error('Error deleting the PDF file:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Error deleting the PDF file',
                });
            }


            await find.deleteOne();


            res.json({
                success: true,
                message: 'Book and  PDF file deleted successfully',
            });
        });

    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the book',
            error,
        });
    }
}

//update a book
exports.UpdateBook=  async(req,res)=>{
  
        try {
          const { title, description, public_date, language, size, category } = req.body;
      
       
          let book = await Library.findById(req.params.id);
          if (!book) {
            return res.status(404).json({ message: 'Book not found' });
          }
      
         
          let author;
          try {
            author = req.body.author ? JSON.parse(req.body.author) : book.author;  
          } catch (error) {
            return res.status(400).json({ message: 'Invalid author format. Author must be valid JSON.' });
          }
     
          if (req.file) {
            
           
            const oldPdfPath = path.join(__dirname, '..', book.pdf);
            fs.unlink(oldPdfPath, (err) => {
              if (err) {
                console.error('Error deleting old PDF file:', err);
              }
            });
      
            book.pdf = req.file.path;  
          }
      
         
          book.title = title || book.title;
          book.description = description || book.description;
          book.public_date = public_date || book.public_date;
          book.language = language || book.language;
          book.size = size || book.size;
          book.author = author || book.author;
          book.category = category || book.category;
          book.updatedAt = Date.now();  
      
         
          await book.save();
      
          res.status(200).json({
            message: 'Book updated successfully!',
            success: true,
          
          });
      
        } catch (error) {
          console.error('Error updating book:', error);
          res.status(500).json({ message: 'An error occurred while updating the book', error });
        }
      };
      
//borrow a book
exports.BorrowBook = async (req, res) => {
    try {
      
      const book = await Library.findById(req.params.id);
  
     
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      
      if (book.borrowedBy) {
        return res.status(400).json({ message: 'This book is already borrowed' });
      }
  
      
      book.borrowedBy = req.user.id;
      book.borrowedAt = Date.now();
  
    
      await book.save();
  
      res.status(200).json({
        message: 'Book borrowed successfully!',
        book,
      });
    } catch (error) {
      console.error('Error borrowing book:', error);
      res.status(500).json({ message: 'An error occurred while borrowing the book', error });
    }
  };

  //return a book
  exports.ReturnBook = async (req, res) => {
    try {
      
      const book = await Library.findById(req.params.id);
  
      
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      
      if (book.borrowedBy && book.borrowedBy.toString() !== req.user.id) {
        return res.status(400).json({ message: 'You cannot return a book you did not borrow' });
      }
  
      
      book.borrowedBy = null;
      book.borrowedAt = null;
  
     
      await book.save();
  
      res.status(200).json({
        message: 'Book returned successfully!',
        book,
      });
    } catch (error) {
      console.error('Error returning book:', error);
      res.status(500).json({ message: 'An error occurred while returning the book', error });
    }
  };
  
  