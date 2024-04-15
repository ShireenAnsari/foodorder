'use client'
import { style } from "@/app/utills/style"
import Menueitems from "./Menueitems"
import Heading from "../smallitems/Heading"
import { useEffect, useState } from "react"

const Menue = () => {
  const [bestsell,setBestSellers]=useState([])
useEffect(()=>{
  fetch('/api/menue-items')
  .then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  })
  .then(menueItems => {
    const bestsellers = menueItems.slice(-3);
    setBestSellers(bestsellers);
    console.log(bestsellers?.name);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

},[])
  return (
    <div className={`${style.Menuediv}  m-auto`}>
        
       <Heading text={'Menues'} desc={'check out'}/>
        <div className={style.menuetopdiv}>
          {bestsell?.length>0 && bestsell.map((itm,i)=>(
            <div key={i}>
                <Menueitems itm={itm}/>
            </div>
         
          ))}
          
        </div>
    </div>
  )
}

export default Menue