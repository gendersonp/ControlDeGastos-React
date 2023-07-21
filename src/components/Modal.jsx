import { useEffect, useState } from 'react';
import Mensaje from './Mensaje';
import CerrarBtn from '../img/cerrar.svg';

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guradarGasto,
  gastoEditar,
  setGastoEditar,
}) => {
  const [mensaje, setMensaje] = useState('');
  const [gasto, setGasto] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fecha, setfecha] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setGasto(gastoEditar.gasto);
      setMonto(gastoEditar.monto);
      setCategoria(gastoEditar.categoria);
      setId(gastoEditar.id);
      setfecha(gastoEditar.fecha);
    }
  }, []);

  const ocultarModal = () => {
    setAnimarModal(false);
    setGastoEditar({});
    setTimeout(() => {
      setModal(false);
    }, 200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([gasto, monto, categoria].includes('')) {
      setMensaje('Todos los campos son obligatorios');

      setTimeout(() => {
        setMensaje('');
      }, 3000);
      return;
    }

    guradarGasto({ gasto, monto, categoria, id, fecha });
  };

  return (
    <div className='modal'>
      <div className='cerrar-modal'>
        <img src={CerrarBtn} alt='cerrar modal' onClick={ocultarModal} />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
      >
        <legend>{gastoEditar.gasto ? 'Editar gasto' : 'Nuevo gasto'}</legend>
        {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

        <div className='campo'>
          <label htmlFor='gasto'>Gasto</label>

          <input
            id='gasto'
            type='text'
            placeholder='Añade el nombre de gasto'
            value={gasto}
            onChange={(e) => setGasto(e.target.value)}
          />
        </div>

        <div className='campo'>
          <label htmlFor='monto'>Monto</label>

          <input
            id='monto'
            type='number'
            placeholder='Añade la cantidad del gasto ej: 300'
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />
        </div>

        <div className='campo'>
          <label htmlFor='categoria'>Categoría</label>

          <select
            id='categoria'
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value=''>Selecciona una categoria...</option>
            <option value='ahorro'>Ahorro</option>
            <option value='comida'>Comida</option>
            <option value='casa'>Casa</option>
            <option value='gastos'>Gastos varios</option>
            <option value='ocio'>Ocio</option>
            <option value='salud'>Salud</option>
            <option value='suscripciones'>Suscripciones</option>
          </select>
        </div>

        <input
          type='submit'
          value={gastoEditar.gasto ? 'Guardar cambios' : 'Añadir gasto'}
        />
      </form>
    </div>
  );
};

export default Modal;
