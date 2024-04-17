'use client'
import { _usefetchuser } from '@/app/actions/_usefetchdata'
import MenueTabs from '@/components/Menues/MenueTabs'
import Menueform from '@/components/Menues/Menueform'
import axios from 'axios'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'
import {  ArrowLeft } from 'react-feather'
import toast from 'react-hot-toast'

const Newitems = () => {
    const {status,isAdmin}=_usefetchuser()
    const [state,setstate]=useState({
      name:'',
      description:'',
      image:'',
      basePrice:'',
      category:''
     })
     const [sizes,setsizes]=useState([]) 
    
    // console.log('This is' ,sizes);
    const data = {
      state: state,
      sizes: sizes
    };
      async function HandleSubmit(ev){
        ev.preventDefault();
        console.log('Submitting');
        console.log('after submit',data)
      try {
         const res= await axios.post('/api/menue-items',data);
         console.log(res)
         if(res.status===200)
         {
            toast.success('Successfully added');
          
     
         }
           redirect('/Menue');
          }
       catch (error) {
        console.log(error);
      }
    }
    if(status==='loading')
    {
        return 'Loading user info...'
    }
    if(!isAdmin)
    {
        return 'Not authenticated'
    }

  return (
   <div>
     <section className='mt-8'>
          <MenueTabs isAdmin={isAdmin}/>
          <div className='flex justify-center m-auto  '>
 <Link  role='button' href={'/Menue/'}> <ArrowLeft className='inline'/> Go back to Menues</Link>
          </div>
         
        <Menueform sizes={sizes} setsizes={setsizes} state={state} setState={setstate} HandleSubmit={HandleSubmit}/>
    </section>
   </div>

  )
}

export default Newitems