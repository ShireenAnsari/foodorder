import { style } from '@/app/utills/style'
import Image from 'next/image'
import React from 'react'

const Menueitems = ({itm}) => {
// console.log('itm is ',itm)
  return (
    <div className={`${style.Menueitm}   p-8 w-80`}>
 <div className='w-40 h-40 flex  m-auto  relative'>
  <Image src={itm?.image} alt='pizzaimg' objectFit='contain' fill /> 
</div>   
 
        <h4 className='font-semibold text-xl my-3'>{itm?.name}</h4>
        <p className='text-gray-500 text-sm  line-clamp-3  '>{itm?.description} </p>
        <button className={`${style.btn} mt-6`}>Add to Cart ${itm?.basePrice}</button>
    </div>
  )
}

export default Menueitems