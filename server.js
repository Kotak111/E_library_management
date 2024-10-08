const express = require('express')
const app = express()
require("dotenv").config();
require("./config/db")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const cookieParser=require("cookie-parser")
const UserRoute=require("./Routes/user.route")
const LibraryRoute=require("./Routes/Library.route")
const port = process.env.PORT
require("dotenv").config();
app.use(cookieParser())
app.use("/api/v1/auth",UserRoute)
app.use("/api/v2/library",LibraryRoute)

app.get("/",(req,res)=>{
    res.send("<center><h1>E-Library_Management_App All apis</h1><br>Get All Apis Use My Link <a href=https://github.com/Kotak111/E_library_management target=_blank>Repository :- E_library_management</a></center>")
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))