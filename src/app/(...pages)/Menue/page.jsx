'use client'
import { _usefetchuser } from '@/app/actions/_usefetchdata';
import { style } from '@/app/utills/style';
import MenueTabs from '@/components/Menues/MenueTabs';
import UploadImage from '@/components/UploadImage';
import React, { useState } from 'react'

const Menue = () => {
    const { isAdmin ,status} = _usefetchuser();
   const [state,setstate]=useState({
    name:'',
    description:'',
    image:''
   })
    if(status==='loading')
    {
        return 'Loading userinfo ...'
    }
    if(!isAdmin)
    {
        return'Not and admin';
    }
  return (
    <section className='mt-8'>
          <MenueTabs isAdmin={isAdmin}/>
          <form  
           className={`flex m-auto justify-center mt-12 gap-4`}
          >
             <div>
                <UploadImage state={state} setState={setstate}/>
            </div>
          <div className="flex flex-col w-1/3">
            <label htmlFor="name">Menue item Name</label>
            <input 
              name="name"
              type="text"
              className={`${style.input} bg-gray-200 `}
            />
             <label htmlFor="desc">Description</label>
            <input 
              name="desc"
              type="text"
              className={`${style.input} bg-gray-200  `}
            />
            <label htmlFor="baseprice">Base price</label>
            <input 
              name="baseprice"
              type="text"
              className={`${style.input} bg-gray-200  `}
            />
           
            <button className={`${style.btn} bg-gray-200 mt-2`}>Save</button>
           
           
          </div>
          
          
          
         
        </form>
    </section>
  )
}

export default Menue