import { MenuItem } from "@/app/Models/Menueitems.model";
import { Db } from "@/db/connect";

export async function GET(req) {
    Db(); 
    const url = new URL(req.url);
      const params = new URLSearchParams(url.search);
    const  _id = params.get('_id');
    try {
        if(!_id)
        {
            return Response.json('No id is founded')
        }
        else{
        let user=await MenuItem.findById(_id);
        console.log(_id);
        return Response.json({user:user})
        }
        
        
    } catch (error) {
        console.log(error)
        return Response.json(error);
    }
     
}
  