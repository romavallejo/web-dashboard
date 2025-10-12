import '../css/pageBase.css'
import Card from '../components/Card.jsx'
import { useAuthentication } from '../context/AuthenticationContext.jsx';

export default function Configuracion(){

    const {logout} = useAuthentication();

    return (
        <div className="page">
            <h1>Configuración</h1>
            <div className="grid">
                <Card title="Configuración de Sesión" size={[1,4]}>
                    <button
                        onClick={logout}>
                            Cerrar Sesión
                    </button>
                </Card>
            </div>
        </div>
    );

};