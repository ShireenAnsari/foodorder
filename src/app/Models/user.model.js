import { Schema, model, models } from "mongoose"
const Userschema=new Schema({
email:{
    type:String,
    required:true,
    unique:true
},
name:{
type:String,
required:true
}
,password:{
    type:String,
    required:true,
},
image: {type: String},
},{timestamps:true})

// Userschema.pre('save', async function (next) {
//     if (this.isModified('password')) {
//       try {
//         const hashedPassword = await bcrypt.hash(this.password, 10);
//         this.password = hashedPassword;
//         next();
//       } catch (error) {
//         next(error);
//       }
//     } else {
//       next();
//     }
//   });
export const User=models?.User || model('User',Userschema);