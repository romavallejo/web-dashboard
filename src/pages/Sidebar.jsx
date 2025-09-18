import '../css/sidebar.css'
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

export default function Sidebar() {

    return (
        <nav className='sidebar'>
            <div>
                <img className="logo"src={logo} alt='Logo'/>
            </div>
            <div className='links'>
                <Link to='/'>Estadisticas</Link>
                <Link to='/categorias'>categorias</Link>
                <Link to='/reportes'>reportes</Link>
                <Link to='/configuracion'>Configuración</Link>
            </div>
        </nav>
    );

};