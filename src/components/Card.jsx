import { motion } from 'framer-motion';
import '../css/Card.css'

export default function Card({ className ,title, size = [1,1], icon, children}) {
    const row = size[0];
    const column = size[1];

    return (
        <motion.div 
            className={`card ${className}`}
            style={{
                gridRow: `span ${row}`,
                gridColumn: `span ${column}`,
            }}
            initial={{ opacity: 0, y:50 }}
            animate={{ opacity: 1, y: 0}}
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.8, bounce: 0.2 },
            }}
        >   
            <div className='title-holder'>
                {icon && <img src={icon} />}
                <p className='title'>{title}</p>
            </div>
            
            {children}
        </motion.div>
    );
}