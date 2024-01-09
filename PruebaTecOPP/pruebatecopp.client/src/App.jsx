import './App.css'
import { Route, Routes } from 'react-router-dom'
import NavBar from './componentes/NavBar';
import Home from './componentes/pages/Home';
import Empleado from './componentes/pages/Empleado';

function App() {

    return (

        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/gestionEmpleados" element={<Empleado />}></Route>
            </Routes>
        </div>

    );
}

export default App;