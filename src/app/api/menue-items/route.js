
import { Db } from "@/db/connect";
import { isAdmin } from "../auth/[...nextauth]/route";
import { MenuItem } from "@/app/Models/Menueitems.model";

export async function POST(req) {
  Db();
  const { state, sizes, extraIngredients } = await req.json();
  console.log('Menu state:', state);
  console.log('Sizes:', sizes);
  console.log('Extra Ingredients:', extraIngredients);
  
  if (await isAdmin()) {
    try {
      // Map the incoming data to fit the MenuItem schema
      const menuItemData = {
        name: state.name,
        description: state.description,
        basePrice: state.basePrice,
        image:state.image,
        sizes: sizes.map(size => ({ name: size.name, price: size.price })),
        extraIngrediants: extraIngredients.map(ingredient => ({ name: ingredient.name, price: ingredient.price }))
      };

      // Create a new MenuItem document
      const menuItemDoc = await MenuItem.create(menuItemData);
      
      console.log('Saved MenuItem:', menuItemDoc);
      
      return Response.json(menuItemDoc);
    } catch (error) {
      console.error('Error saving MenuItem:', error);
      return Response.json({ error: 'Failed to save MenuItem' }, { status: 500 });
    }
  } else {
    return Response.json({ error: 'Unauthorized' }, { status: 403 });
  }
}


export async function PUT(req) {
  Db()
  if (await isAdmin()) {
    // 
    const { data, sizes, extraIngredients } = await req.json();
    const id=data._id
    const menuItemData = {
      name: data.name,
      description: data.description,
      basePrice: data.basePrice,
      image:data.image,
      sizes: sizes?.map(size => ({ name: size.name, price: size.price })),
      extraIngrediants: extraIngredients?.map(ingredient => ({ name: ingredient.name, price: ingredient.price }))
    };

   
    await MenuItem.findByIdAndUpdate(id, menuItemData);
  }
  return Response.json(true);
}

export async function GET() {
  Db();  
    return Response.json(await MenuItem.find())
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