'use client'

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
      {categories?.length>0 && categories?.map((c)=>(<div>
        
      </div>))}
menue items with categories
    </section>
  )
}
