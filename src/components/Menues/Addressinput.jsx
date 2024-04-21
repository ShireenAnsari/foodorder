import { style } from "@/app/utills/style";

export default function AddressInputs({state,inputHandle}){
    return (
        <>
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
        </>
    )
}