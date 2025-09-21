import '../css/pageBase.css'
import Card from '../components/Card.jsx'

export default function Reportes(){

    return (
        <div className="page">
            <div className='header'>
                <h1>Reportes</h1>
                <button>+ Crear Reporte</button>
            </div>
            <div className="grid">
                <Card title='Total Reportes'>

                </Card>
                <Card title='Aceptados'>

                </Card>
                <Card title='Rechazados'>

                </Card>
                <Card title='En Revisión'>

                </Card>
                <Card title='Lista de Reportes' size={[1,4]}>
                    
                </Card>
            </div>
        </div>
    );

};