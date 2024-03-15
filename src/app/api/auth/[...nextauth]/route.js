import { UserInfo } from "@/app/Models/Userinfo.model";
import { Authoptions } from "@/app/utills/Authoptions";
import NextAuth, { getServerSession } from "next-auth/next";
const handler=NextAuth(
  Authoptions
 )
export {handler as GET,handler as  POST}

export async function isAdmin() {
  const session = await getServerSession(Authoptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({email:userEmail});
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}
