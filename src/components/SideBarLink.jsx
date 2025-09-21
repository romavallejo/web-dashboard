import { Link } from 'react-router-dom';
import '../css/SideBarLink.css'

export default function SideBarLink({target,label,icon,isCurrent}) {

    if (isCurrent) 
        return (
            <li className='current'>
                <img src={icon}/>
                <Link to={target}>{label}</Link>
            </li>
        );

    return (
        <li className=''>
            <img src={icon}/>
            <Link to={target}>{label}</Link>
        </li>
    );
}