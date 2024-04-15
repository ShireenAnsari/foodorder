'use client'

import { _usefetchuser, _usefetchuserId } from "@/app/actions/_usefetchdata";
import MenueTabs from "@/components/Menues/MenueTabs";
import Profileform from "@/components/profileForm/Profileform";
import axios from "axios";
import { useEffect, useState } from "react";

 const EditUserPage = ({params}) => {
  const [user, setUser] = useState([]);
  const [msg, setmsg] = useState(false);
  const _id = params?.id; // Extract _id from params
  const { Email,state,setState,status,isAdmin} =_usefetchuserId(_id);
  state._id=_id;
  console.log('The params are', _id);

  // const Fetchusers = async () => {
  //   try {
  //     const res = await axios.get(`/api/profile?_id=${_id}`);
  //     setUser(res?.data);
  //     console.log(user)
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   Fetchusers()
  // }, [_id]);
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
  console.log('state before',state)
  async function submit(ev) {
    ev.preventDefault();
    try {
      const res = await axios.put("/api/profile",state);
      console.log(res);
      setmsg(true);
    } catch (error) {
      console.log(error);
    }
  }
  console.log('state before',state);
  return (
    <div>
    <MenueTabs isAdmin={isAdmin} />

<Profileform Email={Email} state={state} submit={submit} setState={setState}  msg={msg} setmsg={setmsg} inputHandle={inputHandle}/>
    </div>
  )
}
export default EditUserPage
