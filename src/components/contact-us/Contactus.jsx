import React from 'react'
import Heading from '../smallitems/Heading'
import Link from 'next/link'
import { style } from '@/app/utills/style'

const Contactus = () => {
  return (
    <div className={style.contact}>
        <Heading desc={`don't hasitate`} text={'Contact us'}/>
        <Link href={'#'} className={style.phone}>+92439309230</Link>
    </div>
  )
}

export default Contactus