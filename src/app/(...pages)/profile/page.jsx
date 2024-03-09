"use client";
import { style } from "@/app/utills/style";
import Heading from "@/components/smallitems/Heading";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
const Profile = () => {
  const { update } = useSession();
  const Session = useSession();
  const { status } = useSession();
  const Data = Session?.data;
  let Uname = Data?.user?.name;
  const Email = Data?.user?.email;
  const [name, setname] = useState("");
  //   useeffect
  useEffect(() => {
    if (status === "authenticated") {
        setname(Data?.user?.name);
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
  const uImg = Session?.data?.user.image;
  //   function for handle submit
  async function submit(ev) {
    ev.preventDefault();
    try {
      await axios.put("/api/profile", { name });
     // Fetch updated session after the profile update
    const updatedSession = await getSession();
    
    console.log("Before update", Session.data?.user.name);
    
    // Update the session with the new data
   await update(updatedSession);
    
    console.log("After update", updatedSession);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mt-8">
      <Heading text={"Profile"} />
      <div className="flex gap-4 justify-center m-auto">
        <div className=" p-3 rounded-md ">
          <Image src={uImg} width={120} height={120} />
          <button type="button" className={style.Editbtn}>
            Edit
          </button>
        </div>
        <form className="flex flex-col gap-2" onSubmit={submit}>
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

          <button className={style.btn}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
