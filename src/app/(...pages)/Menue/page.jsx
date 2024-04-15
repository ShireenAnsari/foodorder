'use client'
import { _usefetchuser } from '@/app/actions/_usefetchdata';
import { style } from '@/app/utills/style';
import MenueTabs from '@/components/Menues/MenueTabs';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Edit2, PlusCircle, Trash2 } from 'react-feather';
import toast from 'react-hot-toast';


const Menue = () => {
    const { isAdmin ,status} = _usefetchuser();
    const [data,setdata]=useState([])
    // const id=123;
    const Fetchmenues=useCallback(async()=>{
      try {
        const Getdata=await axios.get('/api/menue-items')
        console.log(Getdata?.data)
        if(Getdata.status===200)
        {
          setdata(Getdata.data);
        }
      } catch (error) {
        
      }
    },[])
    useEffect(()=>{
      Fetchmenues();
    },[Fetchmenues])
    if(status==='loading')
    {
        return 'Loading userinfo ...'
    }
    if(!isAdmin)
    {
        return'Not and admin';
    }
    const Handledelete=async(_id)=>{
      const alert=window.confirm('Are you sure you want to delete?');
      if(alert)
      {
        try {
          await axios.delete(`/api/menue-items?_id=${_id}`)
          toast.success('Category Deleted');
          Fetchmenues();
        } catch (error) {
          console.log(error)
        }
      }
      else{
        return
      }
      
    }
 

  return (
    <section className='mt-8 flex flex-col justify-center m-auto'>
          <MenueTabs isAdmin={isAdmin}/>
          <div className='flex justify-center m-auto mt-8 border-2 rounded-sm  p-2 border-black'>
          <Link  role='button' href={'/Menue/newitm'}> Create Menue <PlusCircle className='inline'/></Link>
          </div>
          <div className={`${style.categorydiv} w-full`}>
        <div className=" w-3/4">
          <h1 className={style.heading}>All Categories</h1>
          <table className={style.table}>
            <thead className="bg-gray-200">
              <tr className="p-4">
                <th className={style.td}>Sno</th>
                <th className={style.td}>Name</th>
                <th className={style.td}>Base Price</th>
                <th className={style.td}>Image</th>
                <th className={style.td}>Actions</th>
              </tr>
            </thead>
            
            <tbody>
             
              {data?.map((x,index)=>(
                <tr key={index} className={style.tr}>
                <td className={style.td}>{index+=1}</td>
                <td className={style.td}>{x.name}</td>
                <td className={style.td}>{x.basePrice}</td>
                <td className={style.td}><Image className='flex justify-center m-auto mt-3' src={x.image} width={150} height={150}/></td>
                {/* image */}
                <td className={style.td}>
                  <Link type='button' href={`/Menue/Updatedata/${x._id}`}><Edit2 className={style.tbtn} /></Link>
                  {/* <Edit2  onClick={() => handleEdit(x._id,x.name)}  className={style.tbtn} /> */}
                  <Trash2 onClick={()=>Handledelete(x._id)} className={style.tbtn} />
                </td>
              </tr>
              ))}
              
            </tbody>
          </table>
        </div>

        <div></div>
      </div>
      
    </section>
  )
}

export default Menue