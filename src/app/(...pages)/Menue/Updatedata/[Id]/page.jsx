'use client'
import { _usefetchuser } from '@/app/actions/_usefetchdata';
import Menueform from '@/components/Menues/Menueform';
import axios from 'axios';
import  { useCallback, useEffect, useState } from 'react'

const Update = ({params}) => {
    const {status,isAdmin}=_usefetchuser()
  const [data,setdata]=useState({})
     const _id=params.Id
     const Fetchmenues = useCallback(async () => {
      console.log('Getting data');
      try {
        const Getdata = await axios.get(`/api/menue-by-id?_id=${_id}`);

          console.log(Getdata?.data);
          setdata(Getdata?.data)
          // Handle received data as needed
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }, [_id]);
  
    useEffect(()=>{
      Fetchmenues();
    },[])
    async function HandleSubmit(ev){
        ev.preventDefault();
        console.log('Submitting');
      try {
         const res= await axios.post('/api/menue-items',state);
         console.log(res)
         if(res.status===200)
         {
            toast.success('Successfully added');
       return  redirect('/Menue')
     
         }
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
 {/* My Post: {params.Id}

 {JSON.stringify(data)} */}

 <Menueform state={data?.user} setState={setdata} />
    </div>
   
  )
}

export default Update