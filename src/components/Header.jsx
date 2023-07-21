import NuevoPresupuesto from './NuevoPresupuesto';
import ControlPresupuesto from './ControlPresupuesto';

const Header = ({
  presupuesto,
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto,
  gastos,
  setGastos,
  setModalEliminar,
  animarModalEliminar,
  setAnimarModalEliminar

}) => {
  return (
    <header>
      <h1>Planificador de gastos</h1>
      {isValidPresupuesto ? (
        <ControlPresupuesto presupuesto={presupuesto} 
        gastos={gastos} 
        setGastos={setGastos}
        setPresupuesto={setPresupuesto} 
        setModalEliminar={setModalEliminar}
        animarModalEliminar={animarModalEliminar}
        setAnimarModalEliminar={setAnimarModalEliminar}
        setIsValidPresupuesto={setIsValidPresupuesto}/>
      ) : (
        <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      )}
    </header>
  );
};

export default Header;
