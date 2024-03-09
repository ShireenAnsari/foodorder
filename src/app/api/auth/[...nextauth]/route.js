import { Authoptions } from "@/app/utills/Authoptions";
import NextAuth from "next-auth/next";
const handler=NextAuth(
  Authoptions
 )
export {handler as GET,handler as  POST}