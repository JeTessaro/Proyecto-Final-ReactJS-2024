import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../firebase/config";


export const NavBar = () => {

  let [categories, setCategories] = useState([]);

  useEffect(() => {
    const categoriasRef = collection(db, "categorias");
    getDocs(categoriasRef)
      .then((res) => {
          setCategories(res.docs.map((doc) => {
            return { ...doc.data() }
          }));  
      })
    }, [])
    
  return (
    <header className='nav-menu'>
        <nav>
            <ul className='nav-item'>
              <li>
               <NavLink to="/" activeclassname="active" className="nav-link">Inicio</NavLink>
              </li>
            {
              categories.map((category) => {
                  return (
                    <li className="nav-item" key={category.id}>
                      <NavLink to={`/category/${category.id}`} activeclassname="active" className="nav-link">
                        {category.nombre}
                      </NavLink>
                    </li>
                  )
              })
            }
            </ul>
        </nav>
    </header>
  )
}


