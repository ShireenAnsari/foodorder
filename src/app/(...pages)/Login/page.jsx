'use client'
import  { useState } from 'react'
import { style } from '@/app/utills/style'
import {signIn, useSession} from "next-auth/react"
import Image from 'next/image'
const Login = () => {
const [email,setemail]=useState('');
const [password,setpassword]=useState('');
const [Loginprogress,SetLoginProgress]=useState(false)
const session=useSession();
console.log(session);
async function handlesubmit(ev){
ev.preventDefault();
SetLoginProgress(true)
await signIn('credentials',{email,password,callbackUrl:'/'});
SetLoginProgress(false)
}
  return (
    <section className="mt-20">
    <h1 className={style.registertxt}>Login</h1>
    <form className={style.form}
     onSubmit={handlesubmit}
  
     >
      <input name='email' disabled={Loginprogress} className={style.input} type='email' placeholder='email' value={email} onChange={(e)=>setemail(e.target.value)} />
      <input name='password' className={style.input} type='password' placeholder='password' value={password} onChange={(e)=>setpassword(e.target.value)} disabled={Loginprogress}/>

      <button  disabled={Loginprogress} className={style.btn}>Login</button>
   <div className={style.divreg}>or login with provider</div>
   <button type='button' onClick={()=>signIn('google',{callbackUrl:'/'})}
    className={style.btngoogle}>
   <Image src='/Googleicon.png' width={24} height={24}/>
    Login with google</button>
    </form>
    </section>
  )
}

export default Login