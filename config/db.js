const { default: mongoose } = require("mongoose");

mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("database conneted");
}).catch((err)=>{
    console.log("Database Error");
    
})