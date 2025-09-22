import Card from '../components/Card.jsx'
import '../css/pageBase.css'
import '../css/Estadisticas.css'

export default function Estadisticas() {

    return (
        <div className='page'>
            <h1>Estadísticas</h1>
            <div className='grid'>
                <Card title='Usuarios Registrados'>
                    <p className="number">27</p>
                </Card>
                <Card title='Reportes Totales'>
                    <p className="number">127</p>
                </Card>
                <Card title='Estado de Reportes' size={[2,2]}>
                    
                </Card>
                <Card title='Reportes Creados' size={[2,2]}>
                    
                </Card>
                <Card title='Categorias en Reporters' size={[2,2]}>
                    
                </Card>
            </div>
        </div>
    );

};