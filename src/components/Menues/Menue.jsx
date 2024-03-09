import { style } from "@/app/utills/style"
import Menueitems from "./Menueitems"
import Heading from "../smallitems/Heading"

const Menue = () => {

  return (
    <div className={`${style.Menuediv}  m-auto`}>
        
       <Heading text={'Menue'} desc={'checkout'}/>
        <div className={style.menuetopdiv}>
            <Menueitems/>
            <Menueitems/>
            <Menueitems/>
        </div>
        <div className={style.menuetopdiv}>
            <Menueitems/>
            <Menueitems/>
            <Menueitems/>
        </div>
    </div>
  )
}

export default Menue