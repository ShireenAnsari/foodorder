
import Image from "next/image";
import {useContext, useState} from "react";
import FlyingButton from "react-flying-item";
import MenuItemTile from "./MenuItemTile";
import { CartContext } from "../Appcontext";
import toast from "react-hot-toast";


export default function MenuItem(menuItem) {
  console.log(menuItem)
  const {
    image,name,description,basePrice,
    sizes,
  } = menuItem;
  const [
    selectedSize, setSelectedSize
  ] = useState(sizes?.[0] || null);
  const [showPopup, setShowPopup] = useState(false);
  const {addToCart} = useContext(CartContext);

  async function handleAddToCartButtonClick() {
    console.log('add to cart');
    const hasOptions = sizes.length > 0 ;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }
    addToCart(menuItem, selectedSize);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('hiding popup');
    toast.success('Added to Cart');
    setShowPopup(false);
  }
  

  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
 

  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div
            onClick={ev => ev.stopPropagation()}
            className="my-8 bg-white p-2 rounded-lg max-w-md">
            <div
              className="overflow-y-scroll p-2"
              style={{maxHeight:'calc(100vh - 100px)'}}>
              <Image
                src={image}
                alt={name}
                width={300} height={200}
                className="mx-auto" />
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {description}
              </p>
              {sizes?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Pick your size</h3>
                  {sizes.map(size => (
                    <label
                      key={size._id}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1">
                      <input
                        type="radio"
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                        name="size"/>
                      {size.name} Rs.{basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}
              
              <button
                targetTop={'5%'}
                targetLeft={'95%'}
                src={image}>
                <div className="primary sticky bottom-2 bg-primary text-white p-2"
                     onClick={handleAddToCartButtonClick}>
                  Add to cart Rs.{selectedPrice}
                </div>
              </button>
              <button

                className="mt-2"
                onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile
        onAddToCart={handleAddToCartButtonClick}
        {...menuItem} />
    </>
  );
}