import { style } from "@/app/utills/style"
import UploadImage from "../UploadImage"
import { useState } from "react";
import { Plus, Trash2 } from "react-feather";

const Menueform = ({HandleSubmit,state,setState}) => {
 
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const [sizes,setsizes]=useState([])
  // console.log(state.user.name);
  function addSize(){
  setsizes(oldSizes=>{
    return [...oldSizes,{name:'',price:0}]
  })
  }
  function  Editsize(ev, index, prop) {
    const newValue = ev.target.value;
    setProps(prevSizes => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }
  function removeProp(indexToRemove) {
    setProps(prev => prev.filter((v,index) => index !== indexToRemove));
  }
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
           <div className="bg-gray-200 rounded-md mb-2 flex flex-col">
           <label >Sizes</label>
           {console.log(sizes)}
           {sizes?.length>0 && sizes.map((size,index)=>(
            <div className="flex gap-2">
              <div>
              <label htmlFor="basePrice">Size name</label>
              <input className={style.input} 
              onChange={ev=>Editsize(ev,index,'name')}
               type="text" value={size.name} placeholder="Size name"/>
              </div>
               <div>
               <label htmlFor="basePrice">Extra Price</label>
              <input value={size.price}
              onChange={ev=>Editsize(ev,index,'price')}
               className={style.input} type="text" placeholder="Extra Price"/>
               </div>
               <div>
               <button type="button"
                      onClick={() => removeProp(index)}
                      className="bg-white mb-2 px-2">
                <Trash2 className="inline" />
              </button>
               </div>
              
            </div>
            ))}
           <button type="button" onClick={addSize} className="bg-white"> <b>Add size <Plus className="inline"/></b>  (Like medium or Large)</button>
           </div>
            <button type="submit" className={`${style.btn} bg-gray-200 mt-2`}>Save</button>
           
           
          </div>
          
          
          
         
        </form>
    </div>
  )
}

export default Menueform