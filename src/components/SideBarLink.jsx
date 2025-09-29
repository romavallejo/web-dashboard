import { Link } from 'react-router-dom';
import '../css/SideBarLink.css'

export default function SideBarLink({target,label,icon,isCurrent}) {

    return (
        <li className={isCurrent ? 'current' : ''}>
            <Link className='link-button' to={target}>
                <img src={icon}/>
                <p>{label}</p>
            </Link>
        </li>
    );
}