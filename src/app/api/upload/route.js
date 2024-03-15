import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
export async function POST(req){
    const formData=await req.formData()
    if(formData.get('file'))
    {
        const file=formData.get('file');
        console.log('We have file',formData.get('file'));
        //we can upload file
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename =  file.name.replaceAll(" ", "_");
        console.log(filename);
        try {
          await writeFile(
            path.join(process.cwd(), "/public/" + filename),
            buffer
          );
          return NextResponse.json({filename });
        } catch (error) {
          console.log("Error occured ", error);
          return NextResponse.json({ Message: "Failed", status: 500 });
        }

    }
    // console.log(data);
    // return Response.json(true);
}