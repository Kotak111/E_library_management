const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "pdf") {
            cb(null, './uploads')
        }
    },
    filename: (req, file, cb) => {
        if (file.fieldname==="pdf"){
            cb(null,file.fieldname+Date.now()+path.extname(file.originalname));
        }
    }
});

const upload = multer({
    storage,
    limits:{
        fileSize: 10 * 1024 * 10000
    },
    fileFilter:(req,file,cb)=>{
        checkFileType(file,cb)
    }
})
function checkFileType(file, cb){
    if(file.fieldname === "pdf"){
        if (
            file.mimetype === 'application/pdf' 
            
          ) { 
            cb(null, true);
          } else {
            cb(null, false); 
          }
    }
}

module.exports = upload;