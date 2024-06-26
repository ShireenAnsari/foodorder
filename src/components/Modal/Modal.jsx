'use client'
import { style } from "@/app/utills/style";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Modal({showModal,setShowModal,name,_id,setname}) {
    const Handleupdate=async(e)=>{
        e.preventDefault()
        try {
            await axios.put('/api/categories',{_id,name});
            toast.success('Data updated successfully');
            setShowModal(false);
            
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                   {_id}

                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                    <form onSubmit={Handleupdate}>
                    <input className={style.input} value={name} onChange={(e)=>setname(e.target.value)} />
                 <button type="submit"  className={style.btn}>Edit</button>
                    </form>
               
                </div>
                {/*footer*/}
               
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}