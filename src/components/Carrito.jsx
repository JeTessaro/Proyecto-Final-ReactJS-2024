import React, { Fragment, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from './context/CartContext'

const Carrito = () => {
    const { carrito, setCarrito, calcularTotal, vaciarCarrito, eliminarProducto, actualizarCantidad } = useContext(CartContext);
    
    const acumuladorProductosIguales = () => {
        const productosCantidad = {};
        carrito.forEach(prod => {
            if (productosCantidad[prod.id]) {
                productosCantidad[prod.id].cantidad += 1;
                productosCantidad[prod.id].precio += prod.precio;
            } else {
                productosCantidad[prod.id] = { ...prod, cantidad: 1, precio: prod.precio };
            }
        });
        return Object.values(productosCantidad);
    }

    return (
        <div className="cart-contenedor">
        {acumuladorProductosIguales().map((prod) => {
             console.log(prod);
            return (
                <Fragment key={prod.id}>
                    <div className="cart-item">
                        <img src={prod.img} alt={prod.imagen} className="cart-item-imagen" />
                        <div className="cart-item-detalles">
                            <h2 className="cart-item-titulo">{prod.titulo}</h2>
                            <p className="cart-item-titulo">{prod.descripcion}</p>
                            <p className="cart-item-precio">${prod.precio}</p>
                            <div className="cart-item-acciones">                               
                                <p className="cart-item-cantidad">Cantidad: {prod.cantidad}</p>                                
                                <button className="cart-item-button" onClick={() => { eliminarProducto(prod) }}>X</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        })}
   
        <div className="cart-total-acciones">
            <div className="cart-total">
                <h3>Total: ${calcularTotal().toFixed(2)}</h3>
            </div>
            <div className="cart-acciones">
                <button className="cart-button-accion cart-vaciar" onClick={vaciarCarrito}>Vaciar carrito</button>
                <Link to="/finalizar-compra" className="cart-button-accion cart-finalizar">Finalizar Compra</Link>
            </div>
        </div>
    </div>
    )
}

export default Carrito
