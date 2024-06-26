import { createContext, useEffect, useState} from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {

  const [carrito, setCarrito] = useState(() => {
    // Cargar el carrito desde el localStorage
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  useEffect(() => {
    // Guardar el carrito en el localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  }

  const calcularCantidad = () => {
    return carrito.length;
  }

  const calcularTotal = () => {
    return carrito.reduce ((acc,prod) => acc + prod.precio, 0);
  }
  
  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem('carrito');
  }

  const eliminarProducto = (producto) => {
    const productoEncontrado = carrito.find(prod => prod.id === producto.id);
    const indice = carrito.indexOf(productoEncontrado);
   
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(indice, 1); 
    setCarrito(nuevoCarrito);
  }

  const actualizarCantidad = (producto, nuevaCantidad) => {
    console.log('Actualizando cantidad de producto:', producto);
    console.log('Nueva cantidad:', nuevaCantidad);
    // Lógica para actualizar la cantidad de un producto en el carrito
    setCarrito(carrito.map(item => {
      if (item.id === producto.id) {
        console.log('Producto encontrado, actualizando cantidad...');
        return { ...item, cantidad: nuevaCantidad };
      }
      return item;
    }));
  };

  return (
    <CartContext.Provider value={ { carrito, setCarrito, agregarAlCarrito, calcularCantidad, calcularTotal, vaciarCarrito, eliminarProducto, actualizarCantidad} }>
            {children}
    </CartContext.Provider>
  )
}
