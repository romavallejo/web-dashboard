import Card from '../components/Card.jsx'
import Window from '../components/Window.jsx'
import PaginationReportes from '../components/PaginationReportes.jsx'
import SearchBar from '../components/SearchBar.jsx'
import PaginationControls from '../components/PaginationControls.jsx'
import ReportForm from '../components/ReportForm.jsx'
import { useEffect, useState } from 'react'
import { formatDate } from '../utils/formatDate.js'
import '../css/pageBase.css'
import '../css/Reportes.css'

export default function Reportes(){

    const reports = [
  {
    "id": 1,
    "title": "Reporte de sitio fraudulento",
    "image": "report-pictures/1d92a0a7cbb8f6a32b6ff1a98ecf2af4f13293be20e38e7db23ccfca9a412b8a.jpg",
    "description": "Este sitio web solicita datos bancarios sin medidas de seguridad y redirige a páginas falsas.",
    "created_at": "2025-09-27T23:50:39.000Z",
    "updated_at": "2025-09-27T23:50:39.000Z",
    "user_name": "Skibidi Toilet",
    "created_by": 1,
    "user_image": "profile-pictures/default.jpg",
    "status_id": 1,
    "report_url": "http://banco-seguro-falso.com",
    "categories": [1, 5]
  },
  {
    "id": 2,
    "title": "Página de phishing detectada",
    "image": "report-pictures/34baf3de9a5ef873b432bd723d9e0d45a4c2b79f915a86d2a7b5419ccf78d66c.jpg",
    "description": "El portal imita la interfaz de una empresa de envíos para robar credenciales de acceso.",
    "created_at": "2025-09-27T23:51:32.000Z",
    "updated_at": "2025-09-27T23:51:32.000Z",
    "user_name": "Dr. Sahur",
    "created_by": 2,
    "user_image": "profile-pictures/default.jpg",
    "status_id": 1,
    "report_url": "http://envios-gratis-seguro.net",
    "categories": [2, 5]
  },
  {
    "id": 3,
    "title": "Sitio de ventas falsas",
    "image": "report-pictures/57c0a3a48e923d8bb9e94b3a8ff743a58e9c4e71d4ccf0e6e2e3d513a7f49fdd.jpg",
    "description": "La página ofrece productos electrónicos a precios demasiado bajos y nunca realiza las entregas.",
    "created_at": "2025-09-27T23:51:51.000Z",
    "updated_at": "2025-09-27T23:51:51.000Z",
    "user_name": "Dr. Sahur",
    "created_by": 3,
    "user_image": "profile-pictures/default.jpg",
    "status_id": 2,
    "report_url": "http://ofertas-electronica-barata.org",
    "categories": [3, 5]
  },
  {
    "id": 5,
    "title": "Plataforma de inversión fraudulenta",
    "image": "report-pictures/b9237d0f30ecb0a7dc2f84e6a1cc3af324ea742b93a56f5dd8f0cb11e629bf5e.jpg",
    "description": "El sitio promete ganancias irreales en criptomonedas y exige depósitos sin garantía alguna.",
    "created_at": "2025-09-27T23:52:29.000Z",
    "updated_at": "2025-09-27T23:52:29.000Z",
    "user_name": "Dr. Sahur",
    "created_by": 2,
    "user_image": "profile-pictures/default.jpg",
    "status_id": 3,
    "report_url": "http://crypto-ganancias-rapidas.info",
    "categories": [4, 5]
  },
  {
    "id": 7,
    "title": "Portal falso de soporte técnico",
    "image": "report-pictures/ccf0a7bb2e9d9a4b8347ff291c4b731ddf28573c4a2a5b5d67e3bc111f0a89f3.jpg",
    "description": "La web se hace pasar por un servicio de soporte oficial y pide pagos por reparaciones inexistentes.",
    "created_at": "2025-09-27T23:52:50.000Z",
    "updated_at": "2025-09-27T23:52:50.000Z",
    "user_name": "Skibidi Toilet",
    "created_by": 1,
    "user_image": "profile-pictures/default.jpg",
    "status_id": 2,
    "report_url": "http://soporte-oficial-falso.com",
    "categories": [1, 4]
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
    const categoryMap = Object.fromEntries(categories.map(cat=>[cat.id, cat.name]));

    //ERROR HANDLING
    const [errors,setErrors] = useState({});

    function validateInfo() {
        let newErrors = {};

        if (!reportInfo.title.trim())
            newErrors.title = "El reporte debe tener un título";
        if (reportInfo.categories.length === 0)
            newErrors.categories = "El reporte debe pertenecer por lo menos a una categoría";
        if (!reportInfo.description.trim())
            newErrors.description = "El reporte debe contar con una descripción";
        if (!reportInfo.link.trim())
            newErrors.link = "El reporte debe incluir el link relacionado"
        if (reportInfo.status_id === 0)
            newErrors.status_id = "El reporte debe encontrarse en algún estado"
        if (!reportInfo.image)
            newErrors.image = "El reporte debe contar con una imagen"

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const [filteredReports,setFilteredReports] = useState([]);
    const [filters,setFilters] = useState(
        {
            textFilter: "",
            status_id: 0,
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

        if (filters.status_id !== 0)
            result = result.filter(rep => rep.status_id === filters.status_id);

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
    
    //STATES FOR REPORT FORM
    const [reportInfo,setReportInfo] = useState({
        id: 0,
        title: "",
        image: null,
        categories: [],
        description: "",
        link: "",
        status_id: 0,
        user: ""
    });

    function handleSetReportInfo(report) {
            setReportInfo({
                id: 0,
                title: "",
                image: null,
                categories: [],
                description: "",
                link: "",
                status_id: 0,
                user: ""
            });
    }

    const handleSearch = text => {
        setFilters(prev => {return {...prev, textFilter: text}})
    }

    function createReport () {
        if (validateInfo()) {
            //fetch here
        } else {

        }
    }
        
    return (
        <div>
            <div className="page">
                <div className='header'>
                    <h1>Reportes</h1>
                    <button onClick={()=>{
                        handleSetReportInfo();
                        setIsCreateReportOpen(true);
                    }}>+ Crear Reporte</button>
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
                            <select className='toggle-select' onChange={e => setFilters(prev => {return {...prev, status_id: Number(e.target.value)}})}>
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
                        <PaginationReportes 
                            rows={paginatedReports} 
                            categorias={categories}
                            categoryMap={categoryMap}
                            reportInfoState={reportInfo} 
                            setReportInfoState={setReportInfo}
                            errorState={errors}
                            validateInfoFunction={validateInfo}
                        />
                        <PaginationControls 
                            pagination={pagination}
                            onPageChange={setPagination}
                        />
                    </Card>
                </div>
            </div>

            {isCreateReportOpen &&
                <Window title="Crear Reporte" onClose={()=>{
                    setIsCreateReportOpen(false);
                }}>
                    <ReportForm 
                        reportInfoState={reportInfo}
                        setReportInfoState={setReportInfo}
                        onSubmit={createReport}
                        submitLabel='Crear Reporte'
                        categories={categories}
                        categoryMap={categoryMap}
                        errorState={errors}
                    />
                </Window>
            }
        </div>
    );

};