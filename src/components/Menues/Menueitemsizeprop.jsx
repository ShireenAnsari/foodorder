'use client'
import { style } from "@/app/utills/style";
import { useState } from "react";
import { Plus, Trash2 } from "react-feather";

const Menueitemsizeprop = ({name,sizes,setsizes,addLabel}) => {
    
    function addSize(){
       
        setsizes(oldSizes=>{
          return [...oldSizes,{name:'',price:0}]
        })
        }
        function  Editsize(ev, index, prop) {
          const newValue = ev.target.value;
          setsizes(prevSizes => {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
          });
        }
        function removeSize(indexToRemove) {
            setsizes(prev => prev.filter((v,index) => index !== indexToRemove));
        }
  return (
    <div className="bg-gray-200 rounded-md mb-2 flex flex-col">
    <label >{name}</label>
    {console.log(sizes)}
    {sizes?.length>0 && sizes.map((size,index)=>(
     <div className="flex ">
       <div>
       <label htmlFor="basePrice">Size name</label>
       <input className={`${style.input} w-28`}
       onChange={ev=>Editsize(ev,index,'name')}
        type="text" value={size.name} placeholder="Size name"/>
       </div>
        <div>
        <label htmlFor="basePrice">Extra Price</label>
       <input value={size.price}
       onChange={ev=>Editsize(ev,index,'price')}
        className={`${style.input} w-28`} type="text" placeholder="Extra Price"/>
        </div>
        <div >
        <button type="button"
               onClick={() => removeSize(index)}
              >
         <Trash2 />
       </button>
        </div>
       
     </div>
     ))}
    <button type="button" onClick={addSize} className="bg-white flex flex-col justify-center items-center mt-4"> <b><Plus className="inline"/> {addLabel} </b>  (Like medium or Large)</button>
    </div>
  )
}

export default Menueitemsizeprop