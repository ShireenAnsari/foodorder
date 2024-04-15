import { UserInfo } from "@/app/Models/Userinfo.model";
import { User } from "@/app/Models/user.model";
import { Authoptions } from "@/app/utills/Authoptions";
import { Db } from "@/db/connect";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export  async function PUT(req) {
  Db();
  mongoose.model('Users');
    const data = await req.json();
    const {_id,name,image,...other}=data;
    console.log('Id is ',_id);
    let filter = {};
    if (_id) {
      filter = {_id};
    }
    else {
      const session = await getServerSession(Authoptions);
      const email = session.user.email;
      filter = {email};
      console.log({session,data});
    }
    console.log(other)
    const user = await User.findOne(filter);
      const res =await User.updateOne(filter, {name:data.name,image:data.image});
       await UserInfo.findOneAndUpdate({email:user.email}, other, {upsert:true});
       //  const res= await User.updateOne({ email },{name:data.name,image:data.image});
       //  await UserInfo.findOneAndUpdate({email},other,{upsert:true})
     console.log(res);
    return  Response.json({ message: "ok" });
  
    // console.log({other});
   
}
export async function GET(req) {
  Db();
  const url = new URL(req.url);
  // console.log(url)
  const _id = url.searchParams.get('_id'); // Corrected syntax
  console.log('url id is ', _id);

  let filterUser = {};
  if (_id) {
    filterUser = {_id};
  }
  else {
    const session = await getServerSession(Authoptions);
    const email = session?.user?.email;
    if (!email) {
      return Response.json({});
    }
    filterUser = {email};
  }

  const user = await User.findOne(filterUser).lean();
  const userInfo = await UserInfo.findOne({email:user.email}).lean();

  return Response.json({...user, ...userInfo});

}

