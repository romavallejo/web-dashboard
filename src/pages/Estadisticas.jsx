import Card from '../components/Card.jsx'
import ReportListItem from '../components/ReportListItem.jsx';
import AlertListItem from '../components/AlertListItem.jsx';
import { getYear, getMonth } from '../utils/formatDate.js';
import { useEffect, useState } from 'react';
import { getDashboardInformation } from '../api/dashboardServices.js';
import '../css/pageBase.css'
import '../css/Estadisticas.css'

import { Line, Pie } from 'react-chartjs-2';

export default function Estadisticas() {

  const [data,setData] = useState(null);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const res = await getDashboardInformation();
        setData(res);
      } catch(err) {
        console.log(err);
      }
    };
    fetchData();
  },[]);

  //GRAPHS FOR REPORTS PER MONTH /*DateProcessing*/ 
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2020 }, (_, i) => currentYear - i);
  const [yearFilter,setYearFilter] = useState(currentYear);
  const [yearReports,setYearReports] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  useEffect(()=>{
    if (!data) return;
    const res = data.reportsPerMonth.reduce((acc,curr)=>{
      if (getYear(curr.month) == yearFilter)
        acc[Number(getMonth(curr.month))-1] = curr.total_reports;
      return acc;
    },[0,0,0,0,0,0,0,0,0,0,0,0]);
    setYearReports(res);
  },[data,yearFilter]);
  const dataReportesCreados = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic',],
    datasets: [
      {
        label: 'Número de Reportes',
        data: yearReports,
        borderColor: '#1B365D',
        backgroundColor: '#2E5A87',
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
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0, 
        },
      },
    },
  };

  //GRAPHS FOR REPORT STATES
  const dataEstadoReportes = {
    labels: ['Aprobaods', 'Pendientes', 'Rechazados'],
    datasets: [
      {
        data: [data ? data.stats.approved_reports : 0, data ? data.stats.pending_reports : 0, data ? data.stats.rejected_reports : 0],
        backgroundColor: ['#38de22', '#FFA500', '#E74C3C'],
      },
    ],
  };
  const optionsEstadoReportes = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
    },
  };

  //GRAPHS FOR REPORTS MOST FREQUENT CATEGORIES
  const [frequentCategories,setFrequentCategories] = useState(null);
  useEffect(()=>{
    if (!data) return;
    let sortedCat = data.topCategoriesReports.sort((a,b)=>
      b.total_reportes - a.total_reportes
    );
    sortedCat = sortedCat.slice(0,5);
    /*
    sortedCat.push({
      name: "Otros",
      total_reportes: sortedCat.reduce((acc,curr)=>{return acc-curr.total_reportes;},data.stats.total_reports),
    });
    */
    setFrequentCategories(sortedCat);
  },[data]);
  const mostFrequentCategories = {
    labels: frequentCategories && frequentCategories.map(cat=>cat.name),
    datasets: [
      {
        data: frequentCategories && frequentCategories.map(cat=>cat.total_reportes),
        backgroundColor: ['#1B365D', '#2E5A87', '#E74C3C','#1ABC9C','#FFA500','#3e87ed'],
      },
    ],
  };

  return (
      <div className='page'>
          <h1>Estadísticas</h1>
          <div className='grid'>

              <Card className={"center"} title='Usuarios Registrados' icon='/icons/user-sec.svg'>
                  <p className="number">{data ? data.stats.total_users : 0}</p>
              </Card>

              <Card title='Reportes Totales' icon='/icons/reports-sec.svg'>
                  <p className="number">{data ? data.stats.total_reports : 0}</p>
              </Card>

              <Card title='Estado de Reportes' size={[2,2]} icon='/icons/status-sec.svg'>
                  <div className='pie-container'>
                      <Pie data={dataEstadoReportes} options={optionsEstadoReportes}/>
                  </div>
              </Card>

              <Card title='Categorías más frecuentes' size={[2,2]} icon='/icons/category-sec.svg'>
                <div className='pie-container'>
                      <Pie data={mostFrequentCategories} options={optionsEstadoReportes}/>
                </div>
              </Card>

              <Card title='Reportes Creados por Mes' size={[2,2]} icon='/icons/calendar-sec.svg'>
                  <div className='year-filter'>
                    <select 
                      className='toggle-select'
                      value={yearFilter}
                      onChange={e=>{setYearFilter(e.target.value)}}
                    >
                      {years.map(y=>(
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <div className="line-container">
                      <Line data={dataReportesCreados} options={optionsReportesCreados} />
                  </div>
              </Card>
              
              <Card title="Top Reportes del Mes" size={[2,2]} icon='/icons/reports-sec.svg'>
                <ul className='top-reportes'>
                  {data &&
                    data.topReportsMonth.map(rep =>
                      <ReportListItem key={rep.title} id={rep.id} title={rep.title} upvotes={rep.upvotes}/>
                    )
                  }
                </ul>
              </Card>

              <Card title="Alertas Recientes" size={[2,2]} icon='/icons/alert-sec.svg'>
                <ul className='recent-alerts'>
                  {data &&
                    data.recentAlerts.map(alert =>
                      <AlertListItem key={alert.title} alert={alert.title}/>
                    )
                  }
                </ul>
              </Card>

          </div>
      </div>
  );
};