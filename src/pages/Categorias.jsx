import '../css/pageBase.css'
import Card from '../components/Card.jsx'
import { RecentTransactions } from '../components/RecentTransactions.js';

export default function Categorias() {

    return (
        <div className="page">
            <div className='header'>
                <h1>Categorías</h1>
                <button>+ Crear Categoria</button>
            </div>
            <div className="grid">
                <Card title="Lista de Categorias" size={[1,4]}>
                    <RecentTransactions></RecentTransactions>
                </Card>
            </div>
        </div>
    );

};