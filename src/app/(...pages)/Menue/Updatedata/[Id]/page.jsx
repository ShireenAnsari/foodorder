'use client'
import { _usefetchuser } from '@/app/actions/_usefetchdata';
import Menueform from '@/components/Menues/Menueform';
import axios from 'axios';
import  { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const Update = ({params}) => {
    const {status,isAdmin}=_usefetchuser()
  const [data,setdata]=useState({})
  const [sizes,setsizes]=useState({}) 
  const datamenue = {
    data: data,
    sizes: sizes,
    
  };
     const _id=params.Id
     const Fetchmenues = useCallback(async () => {
      console.log('Getting data');
      try {
        const Getdata = await axios.get(`/api/menue-by-id?_id=${_id}`);

          console.log(Getdata?.data);
          const { sizes,...others}=Getdata?.data.user
          console.log(data)
          setdata(others)
          setsizes(sizes)
         
          // Handle received data as needed
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }, [_id]);
  
    useEffect(()=>{
      Fetchmenues();
    },[])
  const HandleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const res= await axios.put('/api/menue-items',datamenue);
      console.log(datamenue)
      console.log(res)
      if(res.status===200)
      {
         toast.success('Successfully updated data');
       
        //  redirect('/Menue');
      }
       
       }catch (error) {
      console.log(error)
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
 {/* My Post: {params.Id}

 {JSON.stringify(data)} */}

 {/* <Menueform state={data} sizes={sizes} setsizes={setsizes} extraIngrediants={extraIngrediants} setExtraIngrediants={setExtraIngrediants} setState={setdata}  HandleSubmit={HandleSubmit}   /> */}
  <Menueform  sizes={sizes} setsizes={setsizes} state={data} setState={setdata} HandleSubmit={HandleSubmit}/>
    </div>
   
  )
}

export default Update