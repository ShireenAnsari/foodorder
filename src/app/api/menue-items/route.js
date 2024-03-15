
import { Db } from "@/db/connect";
import { isAdmin } from "../auth/[...nextauth]/route";
import { MenuItem } from "@/app/Models/Menueitems.model";

export async function POST(req) {
  Db()
  const data = await req.json();
  if (await isAdmin()) {
    const menuItemDoc = await MenuItem.create(data);
    return Response.json(menuItemDoc);
  } else {
    return Response.json({});
  }
}

export async function PUT(req) {
  Db()
  if (await isAdmin()) {
    const {_id, ...data} = await req.json();
    await MenuItem.findByIdAndUpdate(_id, data);
  }
  return Response.json(true);
}

export async function GET() {
  Db()
  return Response.json(
    await MenuItem.find()
  );
}

export async function DELETE(req) {
  Db()
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  if (await isAdmin()) {
    await MenuItem.deleteOne({_id});
  }
  return Response.json(true);
}