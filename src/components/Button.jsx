import '../css/Button.css'
import { motion } from "framer-motion";

export default function Button({ icon, text, onClick, style, disable, type }) {

    return(
        <motion.button 
            type={type} 
            disabled={disable} 
            onClick={onClick} 
            className={`button-wrapper ${style === "save" ? "save-type" : style === "delete" ? "delete-type" : "normal-type"}`}
            whileHover={{scale: 1.1}}
        >
            {icon && <img src={icon} />}
            {text && <p className="button-text">{text}</p>}
        </motion.button>
    );
}