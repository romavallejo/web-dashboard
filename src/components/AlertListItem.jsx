import icon from '/icons/alert.svg'
import { motion } from 'framer-motion';
import '../css/AlertListItem.css'

export default function AlertListItem({ alert }) {
    return (
        <motion.li 
            className="alert-list-item"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.5, bounce: 0.2 },
            }}
        >
            <div className='alert-icon-holder'>
                <img src={icon} alt='alert'/>
            </div>
            <p className='alert-text'>{alert}</p>
        </motion.li>
    );
}