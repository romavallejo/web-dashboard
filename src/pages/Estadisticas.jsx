import Card from '../components/Card.jsx'
import '../css/pageBase.css'
import '../css/Estadisticas.css'

import { Line, Pie } from 'react-chartjs-2';

const dataReportesCreados = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr'],
  datasets: [
    {
      label: 'Número de Reportes',
      data: [3, 2, 2, 1],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ],
};
const optionsReportesCreados = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Reportes por fecha' },
  },
};

const dataEstadoReportes = {
  labels: ['Aceptados', 'En Revisión', 'Rechazados'],
  datasets: [
    {
      data: [10, 20, 30],
      backgroundColor: ['#34d399', '#fbbf24', '#f87171'],
    },
  ],
};

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

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
                    <div className='pie-container'>
                        <Pie data={dataEstadoReportes}/>
                    </div>
                </Card>
                <Card title='Reportes Creados' size={[2,2]}>
                    <div className="line-container">
                        <Line data={dataReportesCreados} options={optionsReportesCreados} />
                    </div>
                </Card>
                <Card title='Categorias en Reporters' size={[2,2]}>
                    <div className='pie-container'>
                        <Pie data={dataEstadoReportes}/>
                    </div>
                </Card>
            </div>
        </div>
    );

};