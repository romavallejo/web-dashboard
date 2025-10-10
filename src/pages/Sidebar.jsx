import '../css/sidebar.css'
import logo from '/logo-dark.png'
import SideBarLink from '../components/SideBarLink';
import { Link } from 'react-router-dom';

const links = [
  {
    path: "/",
    label: "Estadísticas",
    icon: "/icons/barchart.svg",
    iconCurrent: "/icons/barchart-current.svg"
  },
  {
    path: "/categorias",
    label: "Categorías",
    icon: "/icons/category.svg",
    iconCurrent: "/icons/category-current.svg"
  },
  {
    path: "/reportes",
    label: "Reportes",
    icon: "/icons/report.svg",
    iconCurrent: "/icons/report-current.svg"
  },
  {
    path: "/t&c",
    label: "T&C",
    icon: "/icons/terms.svg",
    iconCurrent: "/icons/terms-current.svg"
  },
];


export default function Sidebar({ className, isContracted, setIsContracted, current }) {

    return (
        <>
            {!isContracted ?
                <nav className={`sidebar ${className}`}>
                    <div className='logo-holder'>
                        <img className="logo"src={logo} alt='Logo'/>
                    </div>
                    <ul className='links'>
                        {links.map(link => {
                            return <SideBarLink target={link.path} label={link.label} key={link.path} icon={current === link.path ? link.iconCurrent : link.icon} isCurrent={current === link.path}/>;
                        })}

                        <li className='bottom-options'>
                            <button 
                                className='link-button'
                                onClick={()=>setIsContracted(true)}>
                                <img src="/icons/close.svg" alt="contraer"/>
                                <p>Contraer</p>
                            </button>
                        </li>

                        <li className={current === "/configuracion" ? 'current' : ''}>
                            <Link className='link-button' to="/configuracion">
                                <img src={current === "/configuracion" ? "/icons/config-current.svg" : "/icons/config.svg"}/>
                                <p>Configuración</p>
                            </Link>
                        </li>

                    </ul>
                </nav> : 

                <nav className={`sidebar ${className}`}>
                    <div className='logo-holder'>
                        <img className="logo"src={logo} alt='Logo'/>
                    </div>
                    <ul className='links'>
                        {links.map(link => {
                            return <SideBarLink target={link.path} label={link.label} key={link.path} icon={current === link.path ? link.iconCurrent : link.icon} isCurrent={current === link.path}/>;
                        })}

                        <li className='bottom-options'>
                            <button 
                                className='link-button'
                                onClick={()=>setIsContracted(false)}>
                                <img src="/icons/open.svg" alt="contraer"/>
                            </button>
                        </li>

                        <li className={current === "/configuracion" ? 'current' : ''}>
                            <Link className='link-button' to="/configuracion">
                                <img src={current === "/configuracion" ? "/icons/config-current.svg" : "/icons/config.svg"}/>
                            </Link>
                        </li>

                    </ul>
                </nav>
            }
        </>
    );

};