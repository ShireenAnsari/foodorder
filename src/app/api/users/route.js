import { User } from "@/app/Models/user.model";
import { Db } from "@/db/connect";
import { NextResponse } from "next/server";
export async function GET(){
    Db();
    try {
        const users=await User.find();
if(!users)
{
    return NextResponse.json('No user found',{status:400})
}
    return NextResponse.json(users,{status:200})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:'Error fetching user'},{status:500})
        
    }
    
}