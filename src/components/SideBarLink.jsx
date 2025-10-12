import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../css/SideBarLink.css'

export default function SideBarLink({target,label,icon,isCurrent}) {

    return (
        <motion.li 
            className={isCurrent ? 'current' : ''}
            initial={{ opacity: 0, x: -100, scale: 0 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.5, bounce: 0.2 },
            }}
        >
            <Link className='link-button' to={target}>
                <img src={icon}/>
                <p>{label}</p>
            </Link>
        </motion.li>
    );
}