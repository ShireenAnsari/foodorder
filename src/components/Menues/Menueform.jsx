import { style } from "@/app/utills/style"
import UploadImage from "../UploadImage"
import { useState } from "react";

import Menueitemsizeprop from "./Menueitemsizeprop";
const Menueform = ({HandleSubmit,state,setState,extraIngrediants,setExtraIngrediants,sizes,setsizes}) => {
console.log(state);
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // console.log(state.user.name);

  return (
    <div>
       <form  onSubmit={HandleSubmit}
           className={`flex m-auto justify-center mt-12 gap-4`}
          >
             <div>
                <UploadImage state={state} setState={setState}/>
            </div>
          <div className="flex flex-col w-1/3">
            <label htmlFor="name">Menue item Name</label>
            <input 
              name="name"
              type="text"
              value={state.name}
              onChange={inputHandle}
              className={`${style.input} bg-gray-200 `}
            />
             <label htmlFor="description">Description</label>
            <input 
             value={state.description}
             onChange={inputHandle}
              name="description"
              type="text"
              className={`${style.input} bg-gray-200  `}
            />
            <label htmlFor="basePrice">Base price</label>
            <input 
            value={state.basePrice}
            onChange={inputHandle}
              name="basePrice"
              type="text"
              className={`${style.input} bg-gray-200  `}
            />
            <Menueitemsizeprop  sizes={sizes} setsizes={setsizes} addLabel={'Add item Sizes'} name={'Sizes'}/>
            <Menueitemsizeprop sizes={extraIngrediants} setsizes={setExtraIngrediants} addLabel={'Add Extra ingrediants'} name={'Extra Ingrediants'}/>
          
            <button type="submit" className={`${style.btn} bg-gray-200 mt-2`}>Save</button>
           
           
          </div>
          
          
          
         
        </form>
    </div>
  )
}

export default Menueform