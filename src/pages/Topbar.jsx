import { useState } from 'react';
import NavigationOptions from '../components/NavigationOptions';
import '../css/Topbar.css'
import logo from '/logo.png'
import menu from '/icons/menu.svg'

export default function Topbar({ current }) {

    const [areOptionsOpen,setAreOptionsOpen] = useState(false);

    return (
            <nav>
                <div className='top-bar'>
                    <div className='logo-holder'>
                        <img className="logo-small" src={logo} alt='Logo'/>
                    </div>
                    <div className='menu-holder'>
                        <button 
                            className='menu-button'
                            onClick={()=>setAreOptionsOpen(true)}
                        >
                            <img src={menu} alt='Menu'/>
                        </button>
                    </div>
                </div>

                {areOptionsOpen &&
                    <NavigationOptions current={current}/>
                }
                
            </nav>
    );
}