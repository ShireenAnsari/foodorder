import { User } from "@/app/Models/user.model";
import { Authoptions } from "@/app/utills/Authoptions";
import { Db } from "@/db/connect";
import { getServerSession } from "next-auth";
export async function PUT(req) {
  Db();
//   const {update}=await getServerSession(Authoptions);
  const session = await getServerSession(Authoptions);
  const data = await req.json();
  console.log({ session, data });
  const email = session?.user.email;
  if ("name" in data) {
    await User.updateOne({ email }, { name: data?.name });
  }
  return Response.json({ message: "ok" });
}
