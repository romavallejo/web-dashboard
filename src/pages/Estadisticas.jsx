import Card from '../components/Card.jsx'
import { getReports } from '../api/reportServices.js';
import { getCategories } from '../api/categoryServices.js'
import { getUsersCount } from '../api/userServices.js';
import { getYear, getMonth } from '../utils/formatDate.js';
import { useEffect, useState } from 'react';
import '../css/pageBase.css'
import '../css/Estadisticas.css'

import { Line, Pie } from 'react-chartjs-2';

export default function Estadisticas() {

  const [reports,setReports] = useState([]);
  const [categories,setCategories] = useState([]);
  const[users,setUsers] = useState([]);

  useEffect(()=>{
    async function fetchAll() {
      try {
        const [reportsRes, categoriesRes, usersRes] = await Promise.all([
          getReports(),
          getCategories(),
          getUsersCount()
        ]);
        setReports(reportsRes);
        setCategories(categoriesRes);
        setUsers(usersRes.count);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    }
    fetchAll();
  },[]);

  //INFO PROCESSING
  const [stats,setStats] = useState({
    totalUsers: 0,
    reportStatusCount: {total: 0, pendiente: 0, aceptado: 0, rechazado: 0},
    reportsPerMonth: new Array(12).fill(0),
    categoriesCount: {},
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2020 }, (_, i) => currentYear - i);
  const [yearFilter,setYearFilter] = useState(currentYear);
  
  useEffect(() => {
    const counts = reports.reduce(
      (acc, report) => {
        acc.total++;
        switch (report.status_id) {
          case 1:
            acc.pendiente++;
            break;
          case 2:
            acc.aceptado++;
            break;
          case 3:
            acc.rechazado++;
            break;
        }
        return acc;
      },
      { total: 0, pendiente: 0, aceptado: 0, rechazado: 0 }
    );
    setStats(prev => ({
      ...prev,
      reportStatusCount: counts,
    }));
  }, [reports]);

  useEffect(() => {
    const monthly = new Array(12).fill(0);
    reports.forEach(report => {
      if (getYear(report.created_at) === Number(yearFilter)) {
        monthly[getMonth(report.created_at) - 1]++;
      }
    });
    setStats(prev => ({
      ...prev,
      reportsPerMonth: monthly,
    }));
  }, [reports, yearFilter]);

  useEffect(()=>{
    if (reports.length === 0) return;
    const categoryCounts = reports.reduce((acc, report) => {
      if (!report.categories) return acc;
      for (const catId of report.categories) {
        if (acc.catId) acc.catId++;
        else acc.catID = 1;
      }
      return acc;
    }, {});
    setStats(prev=>({...prev,categoriesCount: categoryCounts}));
  },[reports]);

  useEffect(() => {
    if (reports.length === 0 || categories.length === 0) return;
    const counts = reports.reduce((acc, report) => {
      for (const catId of report.categories || []) {
        if (acc[catId]) acc[catId]++;
        else acc[catId] = 1
      }
      return acc;
    }, {});
    const mapped = Object.entries(counts).map(([id, count]) => {
      const catName = categories.find(c => c.id === Number(id))?.name || "Desconocido";
      return { id: Number(id), name: catName, count };
    });
    mapped.sort((a, b) => b.count - a.count);
    setStats(prev=>({...prev,mostFrequentCategories: mapped}));
  }, [reports, categories]);

  //GRAPHS SET UP
  const dataReportesCreados = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic',],
    datasets: [
      {
        label: 'Número de Reportes',
        data: stats.reportsPerMonth,
        borderColor: '#1B60F8',
        backgroundColor: '#d9efff',
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

  const dataEstadoReportes = {
    labels: ['Aprobaods', 'Pendientes', 'Rechazados'],
    datasets: [
      {
        data: [stats.reportStatusCount.aceptado,stats.reportStatusCount.pendiente,stats.reportStatusCount.rechazado],
        backgroundColor: ['#38de22', '#FFA500', '#ff0000'],
      },
    ],
  };
  const optionsEstadoReportes = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  return (
      <div className='page'>
          <h1>Estadísticas</h1>
          <div className='grid'>

              <Card title='Usuarios Registrados'>
                  <p className="number">{users}</p>
              </Card>

              <Card title='Reportes Totales'>
                  <p className="number">{stats.reportStatusCount.total}</p>
              </Card>

              <Card title='Estado de Reportes' size={[2,2]}>
                  <div className='pie-container'>
                      <Pie data={dataEstadoReportes} options={optionsEstadoReportes}/>
                  </div>
              </Card>

              <Card title='Reportes Creados por Mes' size={[2,2]}>
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

              <Card title='Categorias más frecuentes' size={[2,2]}>
                <div className='category-list'>
                  {stats.mostFrequentCategories && 
                    stats.mostFrequentCategories.slice(0, 5).map(cat => (
                      <div key={cat.id}>
                        <strong className='cat-name'>{cat.name}</strong>: aparece en <strong className='cat-num'>{cat.count}</strong> reportes
                      </div>
                    ))
                  }
                </div>
                <div className='category-list-small'>
                  {stats.mostFrequentCategories && 
                    stats.mostFrequentCategories.slice(0, 5).map(cat => (
                      <div key={cat.id}>
                        <strong className='cat-name'>{cat.name}</strong> <strong className='cat-num'>{cat.count}</strong> 
                      </div>
                    ))
                  }
                </div>
              </Card>

          </div>
      </div>
  );
};