import React from 'react'
import Heading from '../smallitems/Heading'

const About = () => {
  return (
    <div className='text-gray-500 max-w-2xl mx-auto mt-20'>
        <Heading text={'About us'} desc={'our story'}/>
        <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae minus consequatur ullam, autem mollitia minima blanditiis, ut dolorem adipisci deserunt dignissimos ex suscipit hic maxime inventore quidem nihil culpa! Optio!
        </p>
        <p className='mt-4'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, iste, consequuntur illum praesentium repudiandae labore nesciunt tempore possimus ratione sed nam nulla atque mollitia hic nemo harum suscipit eligendi provident!</p>
    </div>
  )
}

export default About