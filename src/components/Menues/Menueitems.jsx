import { style } from '@/app/utills/style'
import Image from 'next/image'
import React from 'react'

const Menueitems = () => {

  return (
    <div className={`${style.Menueitm}   p-8 w-80`}>
 <div className='w-40 h-40 flex  m-auto  relative'>
  <Image src='/Piza.png' alt='pizzaimg' objectFit='contain' fill /> 
</div>   
 
        <h4 className='font-semibold text-xl my-3'>Pepricone Pizza</h4>
        <p className='text-gray-500 text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit hic voluptas incidunt, quis modi voluptates assumenda tempore excepturi. </p>
        <button className={`${style.btn} mt-6`}>Add to Cart</button>
    </div>
  )
}

export default Menueitems