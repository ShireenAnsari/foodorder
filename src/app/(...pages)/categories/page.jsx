"use client";
import { _usefetchuser } from "@/app/actions/_usefetchdata";
import { style } from "@/app/utills/style";
import MenueTabs from "@/components/Menues/MenueTabs";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Edit2, Trash, X } from "react-feather";
import toast from "react-hot-toast";

const CategoriesPage = () => {
  // /api/categories?_id='+_id
  const { status, isAdmin } = _usefetchuser();
  const [name,setcategory]=useState('');
  const [msg, setmsg] = useState(false);
  const [id,setId]=useState('');
  const [data,setdata]=useState([])
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState('');
  console.log("admin is ", isAdmin);
  const getCategories = useCallback(async () => {
    try {
      const res = await axios.get('/api/categories');
      setdata(res?.data);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }, []); // No dependencies, as it doesn't rely on external state
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      if (editMode) {
        // If in edit mode, update the category
        await axios.put(`/api/categories`, { name: editedName,_id:id });
        toast.success('Category updated successfully');
      } else if(!editMode){
        // If not in edit mode, create a new category
        console.log('Name is',name);
        const res = await axios.post('/api/categories', { name });
        if (res.status === 200) {
          toast.success('Category created successfully');
        }
      }
      setcategory('');
      setEditedName('');
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getCategories();
  }, [getCategories,handleSubmit]); // Dependency added here
  
const Handledelete=async(_id)=>{
  const alert=window.confirm('Are you sure you want to delete?');
  if(alert)
  {
    try {
      await axios.delete(`/api/categories?_id=${_id}`)
      toast.success('Category Deleted');
    } catch (error) {
      console.log(error)
    }
  }
  else{
    return
  }
  
}
// useEffect(() => {
//   console.log('Edited name is',editedName);
// }, [editedName]);
const handleEdit = (_id, name) => {
  setId(_id);
  setEditedName(name);
  console.log(editedName,name);
  setEditMode(true);
}
  return isAdmin ? (
    <div className="mt-12">
      <MenueTabs isAdmin={isAdmin} />
      <div className=" w-48 flex justify-center m-auto mt-8">
    {msg && (
            <p className=" bg-green-400 text-green-800 font-bold p-2 text-center rounded-md cursor-pointer">
             Category created
              <X className="inline" onClick={() => setmsg(false)} />
            </p>
          )}
    </div>
      <div className={style.categorydiv}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col  w-2/5">
            <label htmlFor="name">Enter Category</label>
            <input 
            value={editMode?editedName:name}
            onChange={(e) => editMode ? setEditedName(e.target.value) : setcategory(e.target.value)}
              name="name"
              type="text"
              className={`${style.input} inpt-wd `}
            />
          </div>
          <button className={`${style.btn} mt-2`}>{editMode ? 'Edit' : 'Create'}</button>
        </form>
      </div>
      <div className={style.categorydiv}>
        <div className=" w-2/5">
          <h1 className={style.heading}>All Categories</h1>
          <table className={style.table}>
            <thead className="bg-gray-200">
              <tr className="p-4">
                <th className={style.td}>Sno</th>
                <th className={style.td}>Name</th>
                <th className={style.td}>Actions</th>
              </tr>
            </thead>
            <tbody>
             
              {data?.map((x,index)=>(
                <tr key={x} className={style.tr}>
                <td className={style.td}>{index+=1}</td>
                <td className={style.td}>{x.name}</td>
                <td className={style.td}>
                  <Edit2  onClick={() => handleEdit(x._id,x.name)}  className={style.tbtn} />
                  <Trash onClick={()=>Handledelete(x._id)} className={style.tbtn} />
                </td>
              </tr>
              ))}
              
            </tbody>
          </table>
        </div>

        <div></div>
      </div>
    
    </div>
  ) : (
    "Can not access"
  );
};

export default CategoriesPage;
