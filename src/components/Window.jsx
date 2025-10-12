import Button from './Button';
import { motion } from 'framer-motion';
import '../css/Window.css'

export default function Window({ title, onClose, disableButton, children }) {
    return (
        <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.5, bounce: 0.01 },
            }}
        >
            <div className="modal">
                <div className='modal-header'>
                    <p className='window-descriptor'>{title}</p>
                    <Button onClick={onClose} disable={disableButton} icon='/icons/x.svg' style='delete' />
                </div>
                {children}
            </div>
        </motion.div>
    );
}