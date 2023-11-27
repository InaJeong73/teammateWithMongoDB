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
    phoneNumber:{
        type:String,
        required: true,
        unique: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        unique: true,
    },
    university:{
        type:String,
        required: true,
        unique: false,
    },  
     major:{
        type:String,
        required: true,
        unique: false,
    },

    experience: String,
});

module.exports=mongoose.model('User',userSchema);