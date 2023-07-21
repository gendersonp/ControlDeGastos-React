import { useState, useEffect } from 'react';
import Header from './components/Header';
import Filtro from './components/Filtros';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarId } from '../src/helpers/index.js';
import IconoNuevoGasto from './img/nuevo-gasto.svg';
import ModalEliminar from './components/ModalEliminar';

function App() {
  // ----------UseStates----------
  const [presupuesto, setPresupuesto] = useState(
    +localStorage.getItem('presupuesto') ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  
  const [animarModal, setAnimarModal] = useState(false);

  const [modalEliminar, setModalEliminar] = useState(false);
  const [animarModalEliminar, setAnimarModalEliminar] = useState(false);

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos')
      ? JSON.parse(localStorage.getItem('gastos'))
      : []
  );
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  // ----------UseEffects----------
  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 200);
    }
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    const presupuestoLS = +localStorage.getItem('presupuesto') ?? 0;

    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(
        (gasto) => gasto.categoria === filtro
      );
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

  // ----------Funciones----------
  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 200);
  };

  const guradarGasto = (gasto) => {
    if (gasto.id) {
      //Actualiza
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
      setGastoEditar({});
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 200);
  };

  const eliminarGasto = (id) => {
    const gastosAtualizados = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastosAtualizados);
  };

  // ----------Jsx----------
  return (
    <div className={modal || modalEliminar ? 'fijar' : ''}>
      <Header
        setGastos={setGastos}
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        setModalEliminar={setModalEliminar}
        animarModalEliminar={animarModalEliminar}
        setAnimarModalEliminar={setAnimarModalEliminar}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtro filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt='icono nuevo gasto'
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guradarGasto={guradarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}

      {modalEliminar && (
          <ModalEliminar
            setPresupuesto={setPresupuesto}
            setGastos={setGastos}
            setIsValidPresupuesto={setIsValidPresupuesto}
            setModalEliminar={setModalEliminar}
            animarModalEliminar={animarModalEliminar}
            setAnimarModalEliminar={setAnimarModalEliminar}
          />
      )}
    </div>
  );
}

export default App;
