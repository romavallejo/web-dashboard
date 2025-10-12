import SideBarLink from '../components/SideBarLink';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../css/NavigationOptions.css'

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

export default function NavigationOptions({ current, onClose }) {
    return (
        <div className='navigation-overlay'>
          <div className="navigation">
              <ul className='links'>
                    <motion.button 
                        onClick={onClose}
                        className='close'
                        whileHover={{scale: 1.1}}
                    > 
                        <li>
                            <img src="/icons/x.svg" alt="close"/>
                        </li>
                    </motion.button>

                    {links.map(link => {
                        return <SideBarLink target={link.path} label={link.label} key={link.path} icon={current === link.path ? link.iconCurrent : link.icon} isCurrent={current === link.path}/>;
                    })}

                    <motion.li 
                      className={`bottom-options ${current === "/configuracion" ? 'current' : ''}`}
                      initial={{ opacity: 0, x: -100, scale: 0 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{
                          duration: 0.4,
                          scale: { type: "spring", visualDuration: 0.8, bounce: 0.2 },
                      }}
                    >
                        <Link className='link-button' to="/configuracion">
                            <img src={current === "/configuracion" ? "/icons/config-current.svg" : "/icons/config.svg"}/>
                            <p>Configuración</p>
                        </Link>
                    </motion.li>

              </ul>
          </div>
        </div>
    );
}