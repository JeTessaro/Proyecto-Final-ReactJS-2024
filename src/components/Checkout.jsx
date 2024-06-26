import React, { useContext, useState } from 'react';
import { CartContext } from './context/CartContext';
import { useForm } from 'react-hook-form';
import { collection, addDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import Swal from 'sweetalert2';

const Checkout = () => {
  const { carrito, calcularTotal, vaciarCarrito } = useContext(CartContext);
  const { register, handleSubmit } = useForm();
  const [docId, setDocId] = useState('');

  const comprar = (data) => {
    const pedido = {
      cliente: data,
      productos: carrito,
      total: calcularTotal()
    };
    const pedidosRef = collection(db, 'pedidos');
    addDoc(pedidosRef, pedido)
      .then((doc) => {
        setDocId(doc.id);
        vaciarCarrito();
        Swal.fire({
          title: 'Gracias por tu compra',
          text: `Tu código de seguimiento es: ${doc.id}`,
          icon: 'success',
          confirmButtonText: 'Seguir Comprando',
          showCancelButton: false
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirigir al usuario a la página de inicio
            window.location.href = '/';
          }
        });
      });
  };

  if (docId) {
    return null; // No renderizar nada si ya se ha generado el código de seguimiento
  }

  return (
    <div className="checkout-contenedor">
      <h1>Finalizar Compra</h1>
      <form onSubmit={handleSubmit(comprar)} className="checkout-form">
        <div className="form-campo">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" {...register('nombre', { required: true })} />
        </div>
        <div className="form-campo">
          <label htmlFor="apellido">Apellido:</label>
          <input type="text" id="apellido" {...register('apellido', { required: true })} />
        </div>
        <div className="form-campo">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" {...register('email', { required: true })} />
        </div>
        <div className="form-campo">
          <label htmlFor="telefono">Teléfono:</label>
          <input type="tel" id="telefono" {...register('telefono', { required: true })} />
        </div>
        <div className="form-campo">
          <label htmlFor="cantidad">Cantidad de items:</label>
          <input type="number" id="cantidad" value={carrito.length} disabled />
        </div>
        <div className="form-campo">
          <label htmlFor="total">Total de la orden:</label>
          <input type="number" id="total" value={calcularTotal().toFixed(2)} disabled />
        </div>
        <button type="submit" className="checkout-button">Finalizar Compra</button>
      </form>
    </div>
  );
};

export default Checkout;
