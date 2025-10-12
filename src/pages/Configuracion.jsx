import Card from '../components/Card.jsx'
import Window from '../components/Window.jsx';
import { useState } from 'react';
import { useAuthentication } from '../context/AuthenticationContext.jsx';
import Button from '../components/Button.jsx';
import '../css/pageBase.css'
import '../css/Configuracion.css'

export default function Configuracion(){

    const {logout} = useAuthentication();
    const [confirmLogoutWindow,setConfirmLogoutWindow] = useState(false);

    return (
        <>
        <div className="page">
            <h1>Configuración</h1>
            <div className="grid">
                <Card title="Configuración de Sesión" >
                    <Button 
                        icon="/icons/x.svg"
                        text="Cerrar Sesión"
                        style="delete"
                        onClick={()=>setConfirmLogoutWindow(true)}
                    />
                </Card>
            </div>
        </div>

        {confirmLogoutWindow && 
            <Window title='Confirmación Cierre de Sesión' onClose={()=>setConfirmLogoutWindow(false)}>
                <div className='cierre-sesion-window'>
                    <Button 
                    icon="/icons/delete-forever.svg"
                    text="Cerrar Sesión"
                    style="delete"
                    onClick={logout}
                />
                </div>
            </Window>
        }

        </>
    );

};