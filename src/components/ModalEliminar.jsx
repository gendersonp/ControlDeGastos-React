import React from 'react'
import CerrarBtn from '../img/cerrar.svg';

const ModalEliminar = ({
    setGastos,
    setPresupuesto,
    setIsValidPresupuesto,
    setModalEliminar,
    animarModalEliminar,
    setAnimarModalEliminar
  }) => {

    const ocultarModalEliminar = () => {
        setAnimarModalEliminar(false);

        setTimeout(() => {
          setModalEliminar(false);
        }, 200);
      };

      const resetApplicacion = () => {
        setModalEliminar(false);
        setGastos([]);
        setPresupuesto(0);
        setIsValidPresupuesto(false);
        setAnimarModalEliminar(false);
      };
  return (
    <div className='modal'>
      <div className='cerrar-modal'>
        <img src={CerrarBtn} alt='cerrar modal' onClick={ocultarModalEliminar} />
      </div>

      <div className={`formulario ${animarModalEliminar ? 'animar' : 'cerrar'}`}>
      <legend>Desea resetear la App</legend>
      <button className='reset-app' type='button' onClick={resetApplicacion}>
          Resetear App
        </button>
        <button className='acceptar-butoon' type='button' onClick={ocultarModalEliminar}>
          Cancelar
        </button>
      </div>

      
    </div>
  )
}

export default ModalEliminar
