//schemas/teampost.js
const mongoose=require('mongoose');
const {Schema}=mongoose;
const{Types:{ObjectId}}=Schema;
const postSchema=new Schema({
    poster:{
        type:ObjectId,
        required: true,
        ref:'User',
    },
    post:{
        type:String,
        required: true,
    },
    creatAt:{
        type:Date,
        default:Date.now,
    },
});

module.exports=mongoose.model('TeamPost',postSchema);