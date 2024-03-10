"use client";
import { style } from "@/app/utills/style";
import Heading from "@/components/smallitems/Heading";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { X } from "react-feather";
const Profile = () => {
  const Session = useSession();
  console.log(Session);
  const { status } = useSession();
  const Data = Session?.data;
  let Uname = Data?.user?.name;
  const Email = Data?.user?.email;
  const [image, setImage] = useState(Session?.user?.image);
  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [postalcode, setpostalcode] = useState(null);
  const [country, setcountry] = useState("");
  const [city, setcity] = useState("");
  const [phone, setphone] = useState(null);
  const [msg, setmsg] = useState(false);
  //   useeffect
  const fetchdata = async () => {
    try {
      const response = await axios.get("/api/profile",{ cache:'force-cache'});
      console.log(response?.data);
      setname(Uname);
      setImage(response?.data.image);
      setaddress(response?.data.address);
      setcity(response?.data.city);
      setcountry(response?.data.country);
      setpostalcode(response?.data.postalcode);
      setphone(response?.data.phone);
    } catch (error) {}
  };
  useEffect(() => {
    if (status === "authenticated") {
      fetchdata();
    }
  }, [Session, status]);
  //   console.log(Uname);
  //   console.log(status);
  if (status === "loading") {
    return "Loading...";
  }
  if (status === "unauthenticated") {
    return redirect("/Login");
  }
  //   function for handle submit
  async function submit(ev) {
    ev.preventDefault();
    try {
      const res = await axios.put("/api/profile", {
        name,
        image,
        address,
        city,
        country,
        phone,
        postalcode,
      });
      setmsg(true);
    } catch (error) {
      console.log(error);
    }

    if (status === "loading" || !msg) {
      return "Loading...";
    }
  }
  async function handleFilechange(ev) {
    console.log("Image");
    const files = ev?.target.files;
    console.log(files);
    if (files?.length === 1) {
      const data = new FormData();
      console.log("data is", data);
      data.set("file", files[0]);
      const res = await axios.post("/api/upload", data);
      const fileData = res.data;
      const filename = fileData.filename;
      setImage("/" + filename);
      // console.log(image);
      // console.log('/'+filename);
    }
  }

  return (
    <div className="mt-8">
      <Heading text={"Profile"} />
      <div className="flex  gap-4 justify-center m-auto">
        <div className=" p-3 rounded-md ">
          <Image src={image} alt="avatar" width={120} height={120}  />

          <label htmlFor="img">
            <input
              type="file"
              name="img"
              className="hidden"
              id="img"
              onChange={handleFilechange}
            />
            <span className={`${style.Editbtn}`}>Edit</span>
          </label>
        </div>
        <form className="flex flex-col gap-2" onSubmit={submit}>
          {msg && (
            <p className=" bg-green-400 text-green-800 font-bold p-2 text-center rounded-md cursor-pointer">
              Profile Saved{" "}
              <X className="inline" onClick={() => setmsg(false)} />
            </p>
          )}
          <input
            type="text"
            value={name}
            className={`${style.input} inpt-wd `}
            onChange={(e) => setname(e.target.value)}
          />
          <input
            type="email"
            value={Email}
            className={`${style.input} inpt-wd bg-gray-200`}
            disabled={true}
          />
          <input
            type="text"
            placeholder="Enter street address"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            className={`${style.input} inpt-wd`}
          />
          <input
            type="number"
            value={postalcode}
            placeholder="Enter Postal Code"
            onChange={(e) => setpostalcode(e.target.value)}
            className={`${style.input} inpt-wd`}
          />
          <input
            type="text"
            value={city}
            placeholder="Enter City"
            className={`${style.input} inpt-wd`}
            onChange={(e) => setcity(e.target.value)}
          />
          <input
            type="text"
            value={country}
            placeholder="Enter Country"
            className={`${style.input} inpt-wd`}
            onChange={(e) => setcountry(e.target.value)}
          />
          <input
            type="number"
            value={phone}
            placeholder="Enter phone number"
            className={`${style.input} inpt-wd`}
            onChange={(e) => setphone(e.target.value)}
          />

          <button className={style.btn}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
