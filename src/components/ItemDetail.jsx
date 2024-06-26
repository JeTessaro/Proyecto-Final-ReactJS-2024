import React, { useContext } from 'react'
import { useSearchParams } from 'react-router-dom';
import { CartContext } from './context/CartContext';

export const ItemDetail = ( { producto } ) => {

    const { agregarAlCarrito } = useContext (CartContext);

  return (
    <div className = "contendor-detail" >
         <img className='imagen-detail' src={producto.img}/>
         <h1 className="titulo">{producto.categoria.nombre}</h1>
         <p className="descripcion">{producto.descripcion}</p>
         <p className="precio">${producto.precio}</p>
         <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
    </div>
  )
}


