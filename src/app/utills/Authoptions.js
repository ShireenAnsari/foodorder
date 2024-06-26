import bcrypt from 'bcryptjs'
import { User } from "@/app/Models/user.model";
import mongoose from "mongoose";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/app/Libs/mongoConnect";
export const Authoptions= {
  adapter:MongoDBAdapter(clientPromise),
    secret:process.env.SECRET,
  providers:[
      CredentialsProvider({
          name: 'Credentials',
          id:  'credentials',
          credentials: {
            username: { label: "email", type: "email", placeholder: "test@gmail.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
         const email=credentials?.email;
         const password=credentials?.password;
          mongoose.connect(process.env.MONGODB_URI)
          const user=await User.findOne({email});
          const passwordOK=user && bcrypt.compareSync(password,user.password)
          // console.log(password);
          console.log(user);
          if(passwordOK)
          {
            return user;
           
          }
          return null
         
          }
        }),
        GoogleProvider({
         
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
  
  ]
  }