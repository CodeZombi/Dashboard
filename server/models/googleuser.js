import mongoose from 'mongoose';

const googleuserSchema = new mongoose.Schema({
    googleId:String,
    fullName:String,
    email:String,
    image:String
},{timestamps:true});


const userdb = new mongoose.model("googleuser",googleuserSchema);

export default userdb;