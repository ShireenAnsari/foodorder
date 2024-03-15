
import { Category } from "@/app/Models/categories.model";
import { Db } from "@/db/connect";
import { isAdmin } from "../auth/[...nextauth]/route";
export async function POST(req) {
  Db();
  const {name}=await req.json();
  if (await isAdmin()) {
    const categoryDoc = await Category.create({name});
    return Response.json(categoryDoc);
  } else {
    return Response.json({});
  }
}

export async function PUT(req) {
  Db();
  const {_id, name} = await req.json();
  if (await isAdmin()) {
    await Category.updateOne({_id}, {name});
  }
  return Response.json(true);
}

export async function GET() {
 Db();
  return Response.json(
    await Category.find()
  );
}

export async function DELETE(req) {
 Db();
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  if (await isAdmin()) {
    await Category.deleteOne({_id});
  }
  return Response.json(true);
}