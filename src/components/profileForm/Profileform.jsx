import { style } from "@/app/utills/style"
import UploadImage from "../UploadImage"
import { X } from "react-feather"
import AddressInputs from "../Menues/Addressinput"

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
      
       <AddressInputs state={state} inputHandle={inputHandle}/>

       <button className={style.btn}>Submit</button>
     </form>
   </div>
  )
}

export default Profileform