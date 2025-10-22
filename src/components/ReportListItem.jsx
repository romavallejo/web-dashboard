import AnimatedNumber from './AnimatedNumber';
import '../css/ReportListItem.css';
import { motion} from "framer-motion";

export default function ReportListItem({ id, title, upvotes}) {
    return (
        <motion.li 
            className="report-list-item"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.5, bounce: 0.2 },
            }}
        >
            <div className="report-id">
                <p className='id-text'>ID {id}</p>
            </div>
            <p className='title-text'>{title}</p>
            <div className="report-upvotes">
                <img src={'/icons/thumb-up-small.svg'} alt='thumb up' />
                <p className='upvote-text'><AnimatedNumber value={upvotes}/></p>
            </div>
        </motion.li>
    );
}