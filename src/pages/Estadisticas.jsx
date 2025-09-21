import '../css/pageBase.css'
import Card from '../components/Card.jsx'

export default function Estadisticas() {

    return (
        <div className='page'>
            <h1>Estadísticas</h1>
            <div className='grid'>
                <Card title='Usuarios Registrados'>
                    
                </Card>
                <Card title='Reportes Totales'>
                    
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