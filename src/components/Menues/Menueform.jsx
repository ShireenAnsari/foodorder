import { style } from "@/app/utills/style"
import UploadImage from "../UploadImage"

import Menueitemsizeprop from "./Menueitemsizeprop"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
const Menueform = ({HandleSubmit,state,setState,sizes,setsizes}) => {
console.log(state);
const [data,setdata]=useState([])
const [category, setCategory] = useState(state?.category || '');
console.log(state)
const getCategories = useCallback(async () => {
  try {
    const res = await axios.get('/api/categories');
    setdata(res?.data);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}, []);
useEffect(() => {
  getCategories();
}, [getCategories]); // Dependency added here
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
            {console.log(category)}
              <select className={style.input} onChange={ev => setCategory(ev.target.value)}>
                <option>Please select any category</option>
            {data?.length > 0 && data.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>

            <Menueitemsizeprop  sizes={sizes} setsizes={setsizes} addLabel={'Add item Sizes'} name={'Sizes'}/>
            <button type="submit" className={`${style.btn} bg-gray-200 mt-2`}>Save</button>
           
           
          </div>
          
          
          
         
        </form>
    </div>
  )
}

export default Menueform