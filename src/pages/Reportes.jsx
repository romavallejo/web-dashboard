import Card from '../components/Card.jsx'
import Window from '../components/Window.jsx'
import PaginationReportes from '../components/PaginationReportes.jsx'
import SearchBar from '../components/SearchBar.jsx'
import PaginationControls from '../components/PaginationControls.jsx'
import ReportForm from '../components/ReportForm.jsx'
import { useEffect, useState } from 'react'
import { formatDate } from '../utils/formatDate.js'
import { useReport } from '../context/ReportContext.jsx'
import { onCommittingReport, onCancelReport} from '../utils/imageLogic.js'
import { getReports } from '../api/reportServices.js'
import { getCategories } from '../api/categoryServices.js'
import '../css/pageBase.css'
import '../css/Reportes.css'

export default function Reportes(){

    const [reports,setReports] = useState([]);
    const [categories,setCategories] = useState([]);

    useEffect(()=>{

        const fetchReports = async () => {
            try {
                const reportsRes = await getReports();
                setReports(reportsRes);
            } catch (err) {
                console.error("Failed to fetch reports:", err);
            }
        }
        fetchReports();

        const fetchCategories = async () => {
            try {
                const reportsRes = await getCategories();
                setCategories(reportsRes);
            } catch (err) {
                console.error("Failed to fetch reports:", err);
            }
        }
        fetchCategories();

    },[])

    const { reportInfo ,setReportInfo, setErrors, validateInfo, filteredReports, setFilteredReports, filters, setFilters } = useReport();

    const categoryMap = Object.fromEntries(categories.map(cat=>[cat.id, cat.name]));

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

    },[filters, reports, categories]);

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

    async function createReport () {
        if (validateInfo()) {
            await onCommittingReport(reportInfo);
            //
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
                        setErrors({});
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
                            categorias={categories}
                            categoryMap={categoryMap}
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
                    onCancelReport(reportInfo);
                }}>
                    <ReportForm 
                        onSubmit={createReport}
                        submitLabel='Crear Reporte'
                        categories={categories}
                        categoryMap={categoryMap}
                    />
                </Window>
            }
        </div>
    );

};