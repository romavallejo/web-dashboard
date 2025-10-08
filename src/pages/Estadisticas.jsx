import Card from '../components/Card.jsx'
import { getReports } from '../api/reportServices.js';
import { getCategories } from '../api/categoryServices.js'
import { useEffect, useState } from 'react';
import '../css/pageBase.css'
import '../css/Estadisticas.css'

import { Line, Pie } from 'react-chartjs-2';

export default function Estadisticas() {

  const [reports,setReports] = useState([]);
  const [categories,setCategories] = useState([]);

  useEffect(()=>{
    async function fetchReports() {
    try {
      const reportsRes = await getReports();
      setReports(reportsRes);
      } catch (err) {
          console.error("Failed to fetch reports:", err);
      }
    }
    fetchReports();

    async function fetchCategories() {
      try {
        const categoriesRes = await getCategories();
        setCategories(categoriesRes);
      } catch(err) {
        console.log(err);
      }
    }
    fetchCategories();
  },[]);

  //INFO PROCESSING
  const [stats,setStats] = useState({
    totalUsers: 0,
    reportStatusCount: {total: 0, pendiente: 0, aceptado: 0, rechazado: 0}
  });
  useEffect(()=>{
    let newStats = {...stats};

    newStats.reportStatusCount = reports.reduce((acc,report)=>{
      acc.total++;
      switch (report.status_id){
        case 1:
          acc.pendiente++;
          break;
        case 2:
          acc.aceptado++;
          break;
        case 3:
          acc.rechazado++;
          break;
        default:
          break;
      }
      return acc;
    },{total: 0, pendiente: 0, aceptado: 0, rechazado: 0});

    console.log(JSON.stringify(newStats));
    setStats(newStats);
  },[categories]);

  //GRAPHS SET UP
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

  return (
      <div className='page'>
          <h1>Estadísticas</h1>
          <div className='grid'>
              <Card title='Usuarios Registrados'>
                  <p className="number">27</p>
              </Card>
              <Card title='Reportes Totales'>
                  <p className="number">{stats.reportStatusCount.total}</p>
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