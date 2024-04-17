"use client";
import { _usefetchuser } from "@/app/actions/_usefetchdata";
import MenueTabs from "@/components/Menues/MenueTabs";
import Profileform from "@/components/profileForm/Profileform";
import axios from "axios";
import { redirect } from "next/navigation";
import { useState } from "react";
const Profile = () => {
  const [msg, setmsg] = useState(false);
  const { Email,state,setState,status,isAdmin} = _usefetchuser();

  async function submit(ev) {
    ev.preventDefault();
    // console.log(state);
    
    try {
      const res = await axios.put("/api/profile", state);
      console.log(res);
      setmsg(true);
    } catch (error) {
      console.log(error);
    }
  }
  if (status === "loading") {
    return "Loading...";
  }
  if (status === "unauthenticated") {
    return redirect("/Login");
  }
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mt-12">
      <MenueTabs isAdmin={isAdmin} />

      <Profileform Email={Email} state={state} setState={setState} submit={submit} msg={msg} setmsg={setmsg} inputHandle={inputHandle}/>
    </div>
  );
};

export default Profile;
