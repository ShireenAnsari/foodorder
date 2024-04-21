'use client'

import MenuItem from "@/components/Menues/MenuItem";
import Heading from "@/components/smallitems/Heading";
import { useEffect, useState } from "react"

export default function MenuePage() {
  const [categories,setcategories]=useState([])
  const [menue,setmenue]=useState([])
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(categories => {
        console.log(categories);
        setcategories(categories); // Assuming setCategories is defined and available
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  
    fetch('/api/menue-items')
      .then(res => res.json())
      .then(menuItems => {
        console.log(menuItems);
        setmenue(menuItems)
      })
      .catch(error => {
        console.error('Error fetching menu items:', error);
      });
  }, []);
  
  return (
    <section>
      
      {categories?.length > 0 && categories.map(c => (
        <div key={c._id}>
          <div className="text-center">
            <Heading text={c.name} />
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
            {menue.filter(item => item.category === c._id).map(item => (
              <MenuItem key={item._id} {...item} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
