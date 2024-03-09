import Image from "next/image"
import { ArrowRight } from "react-feather"
import { style } from '@/app/utills/style';
const Hero = () => {
 
  return (
    <section className={style.section}>
      <div>
      <h1 className={style.head}>Everything is better with a <span className="text-orange-600">pizza</span></h1>
        <p className={style.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti totam laborum, temporibus magni laudantium eligendi eum nihil.</p>
        <div className="flex gap-4">
          <button className={`${style.btn} uppercase`}>Order now <ArrowRight className={style.btnicon}/> </button>
          <button className={style.btnlearnmore} > Learn more <ArrowRight className={style.btnicon}/></button>
        </div>
      </div>
       
        <div className={style.imgdiv}>
        <Image src={'/Piza.png'} layout={'fill'}  alt="pizza" fill />
        </div>
        
    </section>
  )
}

export default Hero