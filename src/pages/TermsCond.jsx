import '../css/pageBase.css'
import Card from '../components/Card.jsx'

export default function TermsCond() {
    return (
        <div className="page">
            <div className='header'>
                <h1>Términos y Condiciones</h1>
                <button>Actualizar T&C</button>
            </div>
            <div className="grid">
                <Card title='Actuales' size={[1,4]}>
                
                </Card>
            </div>
        </div>
    );
};