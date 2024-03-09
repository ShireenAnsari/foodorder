import { style } from '@/app/utills/style'
import React from 'react'

const Heading = ({text,desc}) => {
  return (
    <>
         <p className=" uppercase text-center">{desc}</p>
         <h1 className={`${style.head} text-orange-600 font-mono mb-4 text-center`}>{text}</h1>
    </>
  )
}

export default Heading