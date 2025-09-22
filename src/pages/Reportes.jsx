import Card from '../components/Card.jsx'
import Window from '../components/Window.jsx'
import { useState } from 'react'
import '../css/pageBase.css'
import '../css/Reportes.css'

export default function Reportes(){

    const [isCreateReportOpen,setIsCreateReportOpen] = useState(false);
    const [isEditReportOpen,setIsEditReportOpen] = useState(false);

    return (
        <div>
            <div className="page">
                <div className='header'>
                    <h1>Reportes</h1>
                    <button onClick={()=>setIsCreateReportOpen(true)}>+ Crear Reporte</button>
                </div>
                <div className="grid">
                    <Card title='Total Reportes'>
                        <p className="number">27</p>
                    </Card>
                    <Card title='Aceptados'>
                        <p className="number aceptado">8</p>
                    </Card>
                    <Card title='Rechazados'>
                        <p className="number rechazado">19</p>
                    </Card>
                    <Card title='En Revisión'>
                        <p className="number revision">0</p>
                    </Card>
                    <Card title='Lista de Reportes' size={[1,4]}>
                        
                    </Card>
                </div>
            </div>
            {isCreateReportOpen &&
                <Window title="Crear Reporte" onClose={()=>setIsCreateReportOpen(false)}>
                    contenido para crear reporte aqui
                </Window>
            }
        </div>
    );

};