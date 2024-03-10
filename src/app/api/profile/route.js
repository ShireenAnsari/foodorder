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
    console.log({session,data});
     const email = session.user.email;
  const res=    await User.updateOne({ email }, data);
  console.log(res);
  return  Response.json({ message: "ok" });
}
export async function GET(){
  Db();
  const session = await getServerSession(Authoptions);
  const email = session.user.email;
  return Response.json(
    await User.findOne({email})
  )

}
