'use client'
import { style } from "@/app/utills/style"
import Link from "next/link"
import { usePathname } from "next/navigation"
const Links=[
{name:'categories',
pathname:'/categories'},
{name:'Menue items',
pathname:'/Menue'},
{name:'Users',
pathname:'/users'}
]

const MenueTabs = ({isAdmin}) => {
  const path=usePathname()
  return (
    <div className="flex gap-2 m-auto justify-center">
    <Link  className={`${path==='/profile'?style.active:style.btnmenunars}`} href={"/profile"}>
      Profile
    </Link>
    {isAdmin && (
      <>
       {Links.map((x)=><Link className={`${path===x.pathname?style.active:style.btnmenunars}`}  href={x.pathname}>{x.name}</Link>)}
      </>
    )}
  </div>
  )
}

export default MenueTabs