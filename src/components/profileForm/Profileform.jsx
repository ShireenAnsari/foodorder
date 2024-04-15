import { style } from "@/app/utills/style"
import UploadImage from "../UploadImage"
import { X } from "react-feather"

const Profileform = ({state,setState,submit,msg,setmsg,inputHandle,Email}) => {
  return (
    <div className="flex  gap-4 justify-center m-auto mt-8">
    <UploadImage state={state} setState={setState}/>
     <form className="flex flex-col gap-2" onSubmit={submit}>
       {msg && (
         <p className=" bg-green-400 text-green-800 font-bold p-2 text-center rounded-md cursor-pointer">
           Profile Saved
           <X className="inline" onClick={() => setmsg(false)} />
         </p>
       )}
       <div className="flex flex-col">
         <label htmlFor="name">First and Last name</label>
         <input
           name="name"
           type="text"
           value={state.name}
           className={`${style.input} inpt-wd `}
           onChange={inputHandle}
         />
       </div>
       <div className="flex flex-col">
         <label htmlFor="email">Email</label>
         <input
           name="email"
           type="email"
           value={Email}
           onChange={inputHandle}
           className={`${style.input} inpt-wd bg-gray-200`}
           disabled={true}
         />
       </div>
      
       <div className="flex flex-col">
         <label htmlFor="postalCode">Postal code</label>
         <input
           type="text"
           name="postalCode"
           value={state.postalCode}
           placeholder="Enter Postal Code"
           onChange={inputHandle}
           className={`${style.input} inpt-wd`}
         />
       </div>
       <div className="flex flex-col">
         <label htmlFor="streetAddress">Street Address</label>
         <input type="text" name="streetAddress" placeholder="Enter the Street" value={state.streetAddress} onChange={inputHandle} className={style.input}/>

       </div>
       <div className="flex flex-col">
         <label htmlFor="city">City</label>
         <input
           name="city"
           type="text"
           value={state.city}
           placeholder="Enter City"
           className={`${style.input} inpt-wd`}
           onChange={inputHandle}
         />
       </div>

       <div className="flex flex-col">
         <label htmlFor="country">Country</label>
         <input
           name="country"
           type="text"
           value={state.country}
           placeholder="Enter Country"
           className={`${style.input} inpt-wd`}
           onChange={inputHandle}
         />
       </div>
       <div className="flex flex-col">
         <label htmlFor="phone">Phone number</label>
         <input
           type="text"
           name="phone"
           value={state.phone}
           placeholder="Enter phone number"
           className={`${style.input} inpt-wd`}
           onChange={inputHandle}
         />
       </div>

       <button className={style.btn}>Submit</button>
     </form>
   </div>
  )
}

export default Profileform