import { useState } from 'react';
import NavigationOptions from '../components/NavigationOptions';
import { motion } from 'framer-motion';
import '../css/Topbar.css'
import logo from '/logo-dark.png'
import menu from '/icons/menu.svg'

export default function Topbar({ current }) {

    const [areOptionsOpen,setAreOptionsOpen] = useState(false);
    const [logoLoaded,setLogoLoaded] = useState(false);
    
    return (
            <nav>
                <div className='top-bar'>
                    <div className='logo-holder'>
                        <img className="logo-small" src={logo} alt='Logo' onLoad={()=>setLogoLoaded(true)}/>
                    </div>
                    {logoLoaded &&
                    <motion.div 
                        className='menu-holder'
                        initial={{ opacity: 0, x: -100, scale: 0 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{
                                duration: 0.4,
                                scale: { type: "spring", visualDuration: 0.8, bounce: 0.2 },
                            }}
                    >
                        <button 
                            className='menu-button'
                            onClick={()=>setAreOptionsOpen(true)}
                        >
                            <img src={menu} alt='Menu'/>
                        </button>
                    </motion.div>
                    }
                </div>

                {areOptionsOpen &&
                    <NavigationOptions 
                        current={current} 
                        onClose={()=>{setAreOptionsOpen(false)}}/>
                }
                
            </nav>
    );
}