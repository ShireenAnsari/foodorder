"use client";
import { _usefetchuser } from "@/app/actions/_usefetchdata";
import { style } from "@/app/utills/style";
import { CartContext, cartProductPrice } from "@/components/Appcontext";
import AddressInputs from "@/components/Menues/Addressinput";
import Heading from "@/components/smallitems/Heading";
import Image from "next/image";
import { useContext } from "react";
import { Trash2 } from "react-feather";

export default function CartPage() {
    const {state,setState} = _usefetchuser();
  const { cartProducts,removeCartProduct } = useContext(CartContext);
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  let total=0;
  for(const p of cartProducts)
  {
    total+=cartProductPrice(p);
  }
  return (
    <section className="mt-8 ">
      <Heading text={"Cart"} />
      <div className="grid grid-cols-2 gap-4">
        <div>
          {cartProducts?.length > 0 &&
            cartProducts?.map((product,index) => (
              <div key={index} className="flex gap-4 mb-4 border-b-2 border-gray-300 py-2 items-center">
                <div className="w-24">
                  <Image
                    className="rounded-full"
                    src={product.image}
                    alt="carts"
                    width={240}
                    height={240}
                  />
                </div>
                <div className="grow">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.size && (
                    <div className="text-sm mt-3">
                      <span className="bg-primary rounded-lg text-white p-1">
                        {" "}
                        Size
                      </span>{" "}
                      :{" "}
                      <span className=" text-gray-500">
                        {product.size.name}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                    {product.basePrice} $
                </div>
                <div className="border-2 border-gray-300 p-2">
                <button onClick={()=>removeCartProduct(index)}><Trash2 color="red" className="inline"/></button>
                    </div>
               
              </div>
            ))}
            <div className="py-2 text-right pr-16">
                <span className="text-gray-500">
                Subtotal: 
                </span>
               
                <span className="text-lg font-semibold pl-2">  ${total}</span>
              
            </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg ">
<h2>Check out</h2>
<form>
<AddressInputs state={state} inputHandle={inputHandle}/>
<div className="mt-2">
<button className={style.btn}>Pay ${total}</button>
</div>

</form>


        </div>
      </div>
    </section>
  );
}
