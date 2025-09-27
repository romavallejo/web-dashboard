import { Link } from 'react-router-dom';
import '../css/SideBarLink.css'

export default function SideBarLink({target,label,icon,isCurrent}) {

    return (
        <li className={isCurrent ? 'current' : ''}>
            <img src={icon}/>
            <Link to={target}>{label}</Link>
        </li>
    );
}