'use client'
import { _usefetchuser } from '@/app/actions/_usefetchdata';
import { style } from '@/app/utills/style';
import MenueTabs from '@/components/Menues/MenueTabs'
import React, { useEffect, useState } from 'react'
import {  Edit2 } from 'react-feather';

const Userpage = () => {
  const { isAdmin ,status} = _usefetchuser();
  const [user, setUser] = useState([])

  useEffect(() => {
    fetch('/api/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then(users => {
        setUser(users);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  // console.log(isAdmin);

  if (status === 'loading') {
    return 'Loading userinfo ...';
  }

  if (!isAdmin) {
    return 'Not an admin';
  }
  
  // console.log(user);

  return (
    <section className='mt-8 max-w-2xl mx-auto'>
      <MenueTabs isAdmin={isAdmin} />
      <div className='mt-8'>
      <table className={style.table}>
            <thead className="bg-gray-200">
              <tr className="p-4">
                <th className={style.td}>Sno</th>
                <th className={style.td}>Username</th>
                <th className={style.td}>Email</th>
                <th className={style.td}>Edit</th>
              </tr>
            </thead>
            
            <tbody>
             
              {user?.map((x,index)=>(
                <tr key={index} className={style.tr}>
                <td className={style.td}>{index+=1}</td>
                <td className={style.td}>{x.name}</td>
                <td className={style.td}>{x.email}</td>
                {/* image */}
                <td className={style.td}>
                
                  <a href={`/users/Updateuser/${x._id}`} role='button'><Edit2 className={style.tbtn} /></a>
                  {/* <Edit2  onClick={() => handleEdit(x._id,x.name)}  className={style.tbtn} /> */}
                </td>
              </tr>
              ))}
              
            </tbody>
          </table>
      </div>
    </section>
  );
}

export default Userpage