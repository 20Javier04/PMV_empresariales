import React from 'react';
import { Navigate } from 'react-router-dom';

function RutaProtegida({ element: Element, nivelRequerido }) {
  const autenticado = localStorage.getItem('auth') === 'true';
  const usuario = JSON.parse(localStorage.getItem('usuarioActual'));

  if (!autenticado || !usuario) {
    return <Navigate to="/" />;
  }

  if (nivelRequerido && usuario.nivel !== nivelRequerido) {
    return <Navigate to="/home" />;
  }

  return <Element />;
}

export default RutaProtegida;
