import Card from '../components/Card.jsx'
import Window from '../components/Window.jsx'
import PaginationReportes from '../components/PaginationReportes.jsx'
import SearchBar from '../components/SearchBar.jsx'
import CategoryTag from '../components/CategoryTag.jsx'
import { useEffect, useState } from 'react'
import { formatDate } from '../utils/formatDate.js'
import '../css/pageBase.css'
import '../css/Reportes.css'

export default function Reportes(){

    const reports = [
    {
        "id": 1,
        "title": "Reporte de sitio fraudulento",
        "image": "prueba.jpg",
        "description": "Este sitio web solicita datos bancarios sin medidas de seguridad y redirige a páginas falsas.",
        "created_at": "2025-09-27T23:50:39.000Z",
        "updated_at": "2025-09-27T23:50:39.000Z",
        "user_name": "Skibidi Toilet",
        "created_by": 1,
        "status": 1,
        "report_url": "http://banco-seguro-falso.com",
        "categories": [
        1,
        5
        ]
    },
    {
        "id": 2,
        "title": "Página de phishing detectada",
        "image": "prueba.jpg",
        "description": "El portal imita la interfaz de una empresa de envíos para robar credenciales de acceso.",
        "created_at": "2025-09-27T23:51:32.000Z",
        "updated_at": "2025-09-27T23:51:32.000Z",
        "user_name": "Dr. Sahur",
        "created_by": 2,
        "status": 1,
        "report_url": "http://envios-gratis-seguro.net",
        "categories": [
        2,
        5
        ]
    },
    {
        "id": 3,
        "title": "Sitio de ventas falsas",
        "image": "prueba.jpg",
        "description": "La página ofrece productos electrónicos a precios demasiado bajos y nunca realiza las entregas.",
        "created_at": "2025-09-27T23:51:51.000Z",
        "updated_at": "2025-09-27T23:51:51.000Z",
        "user_name": "Dr. Sahur",
        "created_by": 3,
        "status": 2,
        "report_url": "http://ofertas-electronica-barata.org",
        "categories": [
        3,
        5
        ]
    },
    {
        "id": 5,
        "title": "Plataforma de inversión fraudulenta",
        "image": "prueba.jpg",
        "description": "El sitio promete ganancias irreales en criptomonedas y exige depósitos sin garantía alguna.",
        "created_at": "2025-09-27T23:52:29.000Z",
        "updated_at": "2025-09-27T23:52:29.000Z",
        "user_name": "Dr. Sahur",
        "created_by": 2,
        "status": 3,
        "report_url": "http://crypto-ganancias-rapidas.info",
        "categories": [
        4,
        5
        ]
    },
    {
        "id": 7,
        "title": "Portal falso de soporte técnico",
        "image": "prueba.jpg",
        "description": "La web se hace pasar por un servicio de soporte oficial y pide pagos por reparaciones inexistentes.",
        "created_at": "2025-09-27T23:52:50.000Z",
        "updated_at": "2025-09-27T23:52:50.000Z",
        "user_name": "Skibidi Toilet",
        "created_by": 1,
        "status": 2,
        "report_url": "http://soporte-oficial-falso.com",
        "categories": [
        1,
        4
        ]
    }
    ]

    let categories = [
    {
        "id": 1,
        "name": "Electrodomésticos",
        "description": "Aparatos para el hogar que facilitan las tareas diarias, como refrigeradores, lavadoras o microondas."
    },
    {
        "id": 2,
        "name": "Muebles",
        "description": "Artículos para amueblar y decorar espacios, incluyendo mesas, sillas, sofás y camas."
    },
    {
        "id": 3,
        "name": "Ropa",
        "description": "Prendas de vestir para diferentes estilos, climas y ocasiones."
    },
    {
        "id": 4,
        "name": "Electrónica",
        "description": "Dispositivos tecnológicos como celulares, computadoras, televisores y accesorios."
    },
    {
        "id": 5,
        "name": "Libros",
        "description": "Obras impresas o digitales que abarcan géneros de ficción, no ficción, educación y más."
    },
    {
        "id": 6,
        "name": "Juguetes",
        "description": "Artículos diseñados para la diversión y el aprendizaje de niños de todas las edades."
    },
    {
        "id": 7,
        "name": "Deportes",
        "description": "Equipo, ropa y accesorios relacionados con la práctica y disfrute de actividades deportivas."
    }
]

    const [filteredReports,setFilteredReports] = useState([]);
    const [filters,setFilters] = useState(
        {
            textFilter: "",
            status: 0,
            categoryFilter: 0,
            dateFilter: ""
        }
    );

    const [isCreateReportOpen,setIsCreateReportOpen] = useState(false);

    //PAGINATION
    const [pagination,setPagination] = useState({
        currentPage: 1,
        totalPages: 1
    });
    const reportsPerPage = 20;
    const startIndex = (pagination.currentPage - 1) * reportsPerPage;
    const endIndex = (startIndex + reportsPerPage);
    const paginatedReports = filteredReports.slice(startIndex,endIndex);

    useEffect(() => {
        let result = reports;

        if (filters.status !== 0)
            result = result.filter(rep => rep.status === filters.status);

        if (filters.categoryFilter !== 0)
            result = result.filter(rep => rep.categories.includes(filters.categoryFilter));

        if (filters.textFilter.trim() !== "")
            result = result.filter(rep => rep.user_name.toLocaleLowerCase().includes(filters.textFilter.toLocaleLowerCase()) ||
            rep.id.toString().includes(filters.textFilter.toLocaleLowerCase())
        );

        if (filters.dateFilter !== "")
            result = result.filter(rep => formatDate(rep.created_at) === formatDate(filters.dateFilter));
            
        setFilteredReports(result);
        
        setPagination({
            totalPages:Math.ceil(result.length/reportsPerPage),
            currentPage: 1
        });

    },[filters]);
    
    //STATES FOR CREATING NEW REPORTES
    const [reportInfo,setReportInfo] = useState({
        id: 1,
        title: "",
        image: "",
        categories: [],
        description: "",
        link: "",
        status: 0,
        user: ""
    });

    function handleSetReportInfo(report) {
            setReportInfo({
                id: 0,
                title: "",
                image: "",
                categories: [],
                description: "",
                link: "",
                status: 1,
                user: ""
            });
    }

    const handleSearch = text => {
        setFilters(prev => {return {...prev, textFilter: text}})
    }
        
    return (
        <div>
            <div className="page">
                <div className='header'>
                    <h1>Reportes</h1>
                    <button onClick={()=>setIsCreateReportOpen(true)}>+ Crear Reporte</button>
                </div>
                <div className="grid">
                    <Card title='Total Reportes'>
                        <p className="number">27</p>
                    </Card>
                    <Card title='Aprobado'>
                        <p className="number aceptado">8</p>
                    </Card>
                    <Card title='Rechazados'>
                        <p className="number rechazado">19</p>
                    </Card>
                    <Card title='Pendiente'>
                        <p className="number revision">0</p>
                    </Card>
                    <Card title='Lista de Reportes' size={[1,4]}>
                        <div className='search-bar'>
                            <SearchBar onSearch={handleSearch} holder='ID, Usuario'/>
                            <select className='toggle-select' onChange={e => setFilters(prev => {return {...prev, status: Number(e.target.value)}})}>
                                <option value={0}>Todos los Estados</option>
                                <option value={1}>Pendientes</option>
                                <option value={2}>Aprobados</option>
                                <option value={3}>Rechazados</option>
                            </select>
                            <select className='toggle-select' onChange={e => setFilters(prev => {return {...prev, categoryFilter: Number(e.target.value)}})}>
                                <option value={0}>Todas las Categorias</option>
                                {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                            </select>
                            <input 
                                className='toggle-select' 
                                type="date" 
                                value={filters.dateFilter}
                                onChange={e => setFilters(prev => {return {...prev, dateFilter: e.target.value}})}
                                />
                        </div>
                        <PaginationReportes rows={paginatedReports} categorias={categories}/>
                        <div className='pagination-buttons'>
                            {
                                pagination.currentPage > 1 ? (
                                    <button onClick={() => setPagination(prev => {return {...prev, currentPage: prev.currentPage - 1}})}>
                                        <img src="/icons/arrow-left-highlight.svg" alt="left arrow icon" />
                                    </button>
                                ) : pagination.totalPages !== 1 ?
                                <div className='space-filler' /> : null
                            }
                            {
                                pagination.currentPage < pagination.totalPages ? (
                                    <button onClick={() => setPagination(prev => {return {...prev, currentPage: prev.currentPage + 1}})}>
                                        <img src="/icons/arrow-right-highlight.svg" alt="right arrow icon" />
                                    </button>
                                ) : pagination.totalPages !== 1 ?
                                <div className='space-filler' /> : null
                            }
                        </div>
                    </Card>
                </div>
            </div>

            {isCreateReportOpen &&
                <Window title="Crear Reporte" onClose={()=>{
                    setIsCreateReportOpen(false);
                    handleSetReportInfo();
                }}>
                    <div className="window-layout">
                        <div className="text-holder edit-report-text">
                            <h4>Título del Reporte</h4>
                            <input className='text-input' placeholder='Titulo' value={reportInfo.title} onChange={e => setReportInfo(prev => ({...prev, title: e.target.value}))}/>
                            <p className='user-holder'>{reportInfo.user}DEFINE WHICH USER IN THIS CASE</p>
                            <h4>Categorías</h4>
                            <select className='toggle-select' onChange={e => {
                                setReportInfo(prev => {
                                    if (e.target.value == 0)
                                        return {...prev}
                                    if (!prev.categories.includes(e.target.value))
                                        return {...prev, categories: [...prev.categories, e.target.value]}
                                    return {...prev}
                                });
                            }}>
                                <option value={0}>Selecionar Cateogiras</option>
                                {
                                    categories.map(category =>
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    )
                                }
                            </select>
                            <div className='categories-list'>
                                {
                                    reportInfo.categories.map(id => {
                                        return <CategoryTag 
                                            key={id} 
                                            categoryName={categories[id-1].name} 
                                            onDelete={() => {
                                                setReportInfo(prev =>{
                                                    return {...prev, categories: prev.categories.filter(el => el !== id)}
                                                })
                                            }}
                                        />
                                    })
                                }
                            </div>
                            <h4>Descripción del reporte</h4>
                            <textarea 
                                className='edit-text' 
                                value={reportInfo.description} 
                                onChange={e => setReportInfo(prev => {return {...prev, description: e.target.value}})}
                                rows={5}/>
                            <div className='liga-holder'>
                                <h4>Liga Fraudulenta</h4>
                                <input className='text-input' placeholder='https://ejemplo.com' value={reportInfo.link} onChange={e => setReportInfo(prev => {return {...prev, link: e.target.value}})}/>
                            </div>
                            <div className='categories-list report-state'>
                                <button onClick={()=>setReportInfo(prev => {return {...prev, status: 2}})} className={`tag aceptado ${reportInfo.status === 2 ? 'selected' :''}`}>Aceptado</button>
                                <button onClick={()=>setReportInfo(prev => {return {...prev, status: 3}})} className={`tag rechazado ${reportInfo.status === 3 ? 'selected' : ''}`}>Rechazado</button>
                                <button onClick={()=>setReportInfo(prev => {return {...prev, status: 1}})} className={`tag revision ${reportInfo.status === 1 ? 'selected' : ''}`}>Pendiente</button>
                            </div>
                        </div>
                        <div className="image-holder">
                            <img className='report-image' src={reportInfo.image}/>
                        </div>
                    </div>
                    <div className='save-changes'>
                        <button onClick={()=>{
                            //CALL FOR THE POST ENDPOINT OF REPORTE
                        }}>Crear Reporte</button>
                    </div>
                </Window>
            }
        </div>
    );

};