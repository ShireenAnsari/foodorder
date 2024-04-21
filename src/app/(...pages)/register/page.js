'use client'
import Image from "next/image"
import { useState } from "react"
import { hash } from 'bcryptjs';
import axios from "axios";
import toast from "react-hot-toast";
import { style } from '@/app/utills/style';
import { signIn } from "next-auth/react";
const Register = () => {

const [email,setemail]=useState('');
const [password,setpassword]=useState('');
const [name,setname]=useState('');
const [loading,setloading]=useState(false)
async function handlesubmit(ev){
ev.preventDefault();
const hashedPassword = await hash(password, 10);
// await fetch('/api/register',
// {
//   method:'POST',
//   body:JSON.stringify({email,password:hashedPassword,name}),
//   headers:{'Content-Type':'application/json'},
// }
// )
try {
  setloading(true)
  const res=await axios.post('/api/register',{email,password:hashedPassword,name})
  console.log(res.data);
  if(res.status===402)
  {
//user already exist
toast.error('email or password already exist')
  }
  if(res.status===201)
  {
//success message
toast.success('User created successfully now you can login');
  }
} catch (error) {
  console.log(error);
}
finally{
  setloading(false)
}

}

  return (
  
   <section className="mt-20">
   <h1 className={style.registertxt}>Register</h1>
   <div >
   <form className={style.form} onSubmit={handlesubmit}>
   < input className={style.input}  value={name} onChange={(e)=>setname(e.target.value)} type='text' placeholder='Name'  />
   < input className={style.input}  value={email} onChange={(e)=>setemail(e.target.value)} type='email' placeholder='email'  />
   < input className={style.input} value={password} onChange={(e)=>setpassword(e.target.value)} type='password' placeholder='password'/>
   <button className={style.btn}>{loading?'...':'Register'}</button>
   <div className={style.divreg}>or login with provider</div>
   <button onClick={()=>signIn('google',{callbackUrl:'/'})} className={style.btngoogle}>
   <Image src='/Googleicon.png' width={24} height={24}/>
    Login with google</button>
   </form>

   </div>
   
   </section>
   
  )
}

export default Register