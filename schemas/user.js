const mongoose=require('mongoose');
const {Schema}=mongoose;
const userSchema=new Schema({
    name:{
        type:String,
        required: true,
        unique: true,
    },
    age:{
        type:Number,
        required: true,
        unique: false,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    major:{
        type:String,
        required: true,
        unique: false,
    },
    university:{
        type:String,
        required: true,
        unique: false,
    },
    interest: String,
});

module.exports=mongoose.model('User',userSchema);