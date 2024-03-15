import { UserInfo } from "@/app/Models/Userinfo.model";
import { User } from "@/app/Models/user.model";
import { Authoptions } from "@/app/utills/Authoptions";
import { Db } from "@/db/connect";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export  async function PUT(req) {
  Db();
  mongoose.model('User');
  const session = await getServerSession(Authoptions);
    const data = await req.json();
    const {name,image,...other}=data;
    console.log({session,data});
    console.log({other});
     const email = session.user.email;
     const res= await User.updateOne({ email },{name:data.name,image:data.image});
     await UserInfo.findOneAndUpdate({email},other,{upsert:true})
  console.log(res);
  return  Response.json({ message: "ok" });
}
export async function GET() {
  Db();
  const session = await getServerSession(Authoptions);
  const email = session?.user?.email;

  if (!email) {
    return Response.json({ message: 'ok' });
  }

  const user = await User.findOne({ email }).lean().exec();
  const userinfo = await UserInfo.findOne({ email }).lean().exec();
  return Response.json({ ...user, ...userinfo });
}
