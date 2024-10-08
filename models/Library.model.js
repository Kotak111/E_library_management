const { default: mongoose, Schema, model } = require("mongoose");

const BookSchema= new Schema({
   
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    public_date:{
        type:Date,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    size:{
        type:Number,
        required:true
    },
    author:[
        {
          name: {
            type: String,
            required: true,
          },
          birthdate: {
            type:Date,
            required:true
          },
        },
      ],
    pdf:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },  
    borrowedAt: { type: Date, default: null }, 

})
const Library= model("Library",BookSchema)
module.exports=Library;