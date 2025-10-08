import SideBarLink from '../components/SideBarLink';
import '../css/NavigationOptions.css'

const links = [
  ["/", "Estadísticas", "/icons/barchart.svg", "/icons/barchart-current.svg"],
  ["/categorias", "Categorías", "/icons/category.svg", "/icons/category-current.svg"],
  ["/reportes", "Reportes", "/icons/report.svg", "/icons/report-current.svg"],
  ["/t&c", "T&C","/icons/terms.svg","/icons/terms-current.svg"],
  ["/configuracion", "Configuración", "/icons/config.svg", "/icons/config-current.svg"],
];

export default function NavigationOptions({ current, onClose }) {
    return (
        <div className='navigation-overlay'>
          <div className="navigation">
              <ul className='links'>
                    <button 
                        onClick={onClose}
                        className='close'> 
                        <li>
                            <img src="/icons/close.svg" alt="close"/>
                        </li>
                    </button>
                    {links.map(link => {
                        return <SideBarLink target={link[0]} label={link[1]} key={link[0]} icon={current === link[0] ? link[3] : link[2]} isCurrent={current === link[0]}/>;
                    })}
              </ul>
          </div>
        </div>
    );
}