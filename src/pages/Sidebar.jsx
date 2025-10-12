import '../css/sidebar.css'
import logo from '/logo-dark.png'
import SideBarLink from '../components/SideBarLink';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

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
    const [logoLoaded,setLogoLoaded] = useState(false);
    const [innitSequenceDone,setInnitSequenceDone] = useState(false);
    return (
        <>
            {!isContracted ?
                <nav className={`sidebar ${className}`}>
                    <div className='logo-holder'>
                        <img className="logo"src={logo} alt='Logo' onLoad={()=>setLogoLoaded(true)} />
                    </div>
                    {logoLoaded && 
                        <ul className='links'>
                            {links.map(link => {
                                return <SideBarLink target={link.path} label={link.label} key={link.path} icon={current === link.path ? link.iconCurrent : link.icon} isCurrent={current === link.path}/>;
                            })}

                            {!innitSequenceDone ? 
                            <motion.li 
                                className='bottom-options'
                                initial={{ opacity: 0, x: -100, scale: 0 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{
                                    duration: 0.4,
                                    scale: { type: "spring", visualDuration: 0.5, bounce: 0.2 },
                                }}
                            >
                                <button 
                                    className='link-button'
                                    onClick={()=>{setIsContracted(true);setInnitSequenceDone(true);}}>
                                    <img src="/icons/close.svg" alt="contraer"/>
                                    <p>Contraer</p>
                                </button>
                            </motion.li> :
                            <li 
                                className='bottom-options'
                            >
                                <button 
                                    className='link-button'
                                    onClick={()=>{setIsContracted(true);}}>
                                    <img src="/icons/close.svg" alt="contraer"/>
                                    <p>Contraer</p>
                                </button>
                            </li>
                            }
                            
                            {!innitSequenceDone ?
                            <motion.li 
                                className={current === "/configuracion" ? 'current' : ''}
                                initial={{ opacity: 0, x: -100, scale: 0 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{
                                    duration: 0.4,
                                    scale: { type: "spring", visualDuration: 0.5, bounce: 0.2 },
                                }}
                                whileHover={{scale:1.05}}
                            >
                                <Link className='link-button' to="/configuracion">
                                    <img src={current === "/configuracion" ? "/icons/config-current.svg" : "/icons/config.svg"}/>
                                    <p>Configuración</p>
                                </Link>
                            </motion.li> :
                            <li 
                                className={current === "/configuracion" ? 'current' : ''}
                            >
                                <Link className='link-button' to="/configuracion">
                                    <img src={current === "/configuracion" ? "/icons/config-current.svg" : "/icons/config.svg"}/>
                                    <p>Configuración</p>
                                </Link>
                            </li>
                            }

                        </ul>
                    } 
                </nav> : 

                <nav className={`sidebar ${className}`}>
                    <div className='logo-holder'>
                        <img className="logo"src={logo} alt='Logo'/>
                    </div>
                    <ul className='links'>
                        {links.map(link => {
                            return <SideBarLink target={link.path} label={link.label} key={link.path} icon={current === link.path ? link.iconCurrent : link.icon} isCurrent={current === link.path}/>;
                        })}

                        <li 
                            className='bottom-options'
                        >
                            <button 
                                className='link-button'
                                onClick={()=>setIsContracted(false)}>
                                <img src="/icons/open.svg" alt="contraer"/>
                            </button>
                        </li>

                        <li 
                            className={current === "/configuracion" ? 'current' : ''}
                            
                        >
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