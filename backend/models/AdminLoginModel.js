import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  email:{type:String , required:true},
  password:{type:String , required:true}
})
const adminLoginModel = new mongoose.model("AdminLogin" , adminSchema);
export default adminLoginModel;