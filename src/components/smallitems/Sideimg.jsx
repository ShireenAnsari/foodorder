import Image from 'next/image'
const Sideimg = () => {
  return (
    <div className='flex  hover:bg-red-600' >
        <div className='w-40 h-40   absolute  -z-10'>
  <Image src='/Saladright.png' alt='pizzaimg'  fill /> 
</div> 
<div className='w-40 h-40   absolute right-0'>
  <Image src='/SaladLeft.png' alt='pizzaimg'  fill /> 
</div> 
    </div>
  )
}

export default Sideimg