'use client'
import { style } from "@/app/utills/style";
import axios from "axios";
import Image from "next/image";

const UploadImage = ({state,setState}) => {
    async function handleFilechange(ev) {
        console.log("Image");
        const files = ev?.target.files;
        // console.log(files);
        if (files?.length === 1) {
          const data = new FormData();
          // console.log("data is", data);
          data.set("file", files[0]);
          const res = await axios.post("/api/upload", data);
          // console.log(res);
          const fileData = res.data;
          const filename = fileData.filename;
          setState((prevState) => ({
            ...prevState,
            image: "/" + filename,
          }));
          // console.log(image);
          // console.log('/'+filename);
        }
      }
  return (
    <div className=" p-3 rounded-md ">
          {/* {console.log(state.image)} */}
          
        {state.image ?<Image src={state.image} alt="avatar" width={120} height={120} />:<div className="p-10 bg-gray-300 rounded-md font-semibold">No image :)</div>}

          <label htmlFor="img">
            <input
              type="file"
              name="img"
              className="hidden"
              id="img"
              onChange={handleFilechange}
            />
            <span className={`${style.Editbtn} flex justify-center m-auto`}>Edit</span>
          </label>
        </div>
  )
}

export default UploadImage