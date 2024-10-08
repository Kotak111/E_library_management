const LibraryController=require("../controller/Library.controller");
const { auth, IsUser } = require("../utils/auth");

const router=require("express").Router();
const upload =require("../utils/book.pdf")
router.post("/addbook",upload.single("pdf"),auth,IsUser,LibraryController.CreateBook)
router.get("/",auth,IsUser,LibraryController.GetAllBook)
router.get("/:id",auth,IsUser,LibraryController.GetByIdBook)
router.delete("/:id",auth,IsUser,LibraryController.DeleteBook)
router.patch("/:id",upload.single("pdf"),auth,IsUser,LibraryController.UpdateBook)
//borrow a book
router.post('/books/:id/borrow', auth,IsUser, LibraryController.BorrowBook);
//return a book
router.post('/books/:id/retun', auth,IsUser, LibraryController.ReturnBook);

module.exports=router;