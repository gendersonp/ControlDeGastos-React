import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const ControlPresupuesto = ({ 
  gastos, 
  presupuesto, 
  setGastos, 
  setPresupuesto, 
  setModalEliminar, 
  animarModalEliminar, 
  setAnimarModalEliminar, 
  setIsValidPresupuesto}) => {
  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);



  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => +gasto.monto + total,
      0
    );

    const totalDisponible = +presupuesto - totalGastado;

    //Calcular porcentaje gastado

    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);

    // console.log(nuevoPorcentaje);

    setPorcentaje(nuevoPorcentaje);

    setDisponible(totalDisponible);
    setGastado(totalGastado);
  }, [gastos]);

  const formatearPresupuesto = (cantidad) => {
    return cantidad.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const handleResetApp = () => {
    setModalEliminar(true);

    setTimeout(() => {
      setAnimarModalEliminar(true);
    }, 200);
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
            trailColor: '#f5f5f5',
            textColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
          })}
          value={porcentaje}
          text={`${porcentaje}% gastado`}
        />
      </div>

      <div className='contenido-presupuesto'>
        <button className='reset-app' type='button' onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto:</span> {formatearPresupuesto(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Disponible:</span> {formatearPresupuesto(disponible)}
        </p>
        <p>
          <span>Gastado:</span> {formatearPresupuesto(gastado)}
        </p>
      </div>

    </div>


  );
};

export default ControlPresupuesto;
