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
import { getReports, createNewReport } from '../api/reportServices.js'
import { getCategories } from '../api/categoryServices.js'
import '../css/pageBase.css'
import '../css/Reportes.css'

export default function Reportes(){

    const [reports,setReports] = useState([]);
    const fetchReports = async () => {
            try {
                const reportsRes = await getReports();
                setReports(reportsRes);
            } catch (err) {
                console.error("Failed to fetch reports:", err);
            }
        }

    const [categories,setCategories] = useState([]);
    const fetchCategories = async () => {
            try {
                const reportsRes = await getCategories();
                setCategories(reportsRes);
            } catch (err) {
                console.error("Failed to fetch reports:", err);
            }
        }

    useEffect(()=>{
        fetchReports();
        fetchCategories();
    },[])

    const { reportInfo ,setReportInfo, setErrors, validateInfo, filteredReports, setFilteredReports, filters, setFilters } = useReport();

    const categoryMap = Object.fromEntries(categories.map(cat=>[cat.id, cat.name]));

    const [isCreateReportOpen,setIsCreateReportOpen] = useState(false);
    const [isCreateLoading,setIsCreateLoading] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

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
        if (!validateInfo())
            return;
        setIsCreateLoading(true);
        setIsLoading(true);
        try {
            await createNewReport(reportInfo);
            await onCommittingReport(reportInfo);
            await fetchReports();
            setIsCreateReportOpen(false);
        } catch(err) {
            console.log(err);
            if (err.message?.includes("report_url must be a URL address")){
                setErrors(prev=>({...prev, link: "Debe ser una URL válida"}));
                return;
            }
            setErrors(prev=>({...prev, submit:"Error al momento de subir"}));
        } finally {
            setIsCreateLoading(false);
            setIsLoading(false);
        }
    }

    // STAT INFO
    const [reportStats,setReportStats] = useState({});
    useEffect(()=>{
        const stats = filteredReports.reduce(
        (acc, report) => {
            acc.totalReports++;
            switch (report.status_id) {
                case 2:
                acc.totalAproved++;
                break;
                case 1:
                acc.totalPending++;
                break;
                case 3:
                acc.totalRejected++;
                break;
                default:
                break;
            }
            return acc;
            },{ totalReports: 0, totalAproved: 0, totalRejected: 0, totalPending: 0 }
        );

  setReportStats(stats);
    },[filteredReports])
        
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
                <div className="grid grid-reports">

                    <Card title='Total Reportes'>
                        <p className="number">{reportStats.totalReports}</p>
                    </Card>

                    <Card title='Aprobado'>
                        <p className="number aceptado">{reportStats.totalAproved}</p>
                    </Card>

                    <Card title='Rechazados'>
                        <p className="number rechazado">{reportStats.totalRejected}</p>
                    </Card>

                    <Card title='Pendiente'>
                        <p className="number revision">{reportStats.totalPending}</p>
                    </Card>

                    <Card title='Lista de Reportes' size={[1,4]}>
                        <div className='filter-bar'>
                            <SearchBar onSearch={handleSearch} holder='ID, Usuario'/>
                            <div className='filter-options'>
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
                        </div>
                        <PaginationReportes 
                            rows={paginatedReports}
                            uponUpload={fetchReports}
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
                <Window title="Crear Reporte" 
                    onClose={()=>{
                    setIsCreateReportOpen(false);
                    onCancelReport(reportInfo);
                    }}
                    disableButton={isLoading}
                >
                    <ReportForm 
                        onSubmit={createReport}
                        submitLabel='Crear Reporte'
                        categories={categories}
                        categoryMap={categoryMap}
                        isUploading={isLoading}
                    />

                    {isCreateLoading && <p>Creando Reporte...</p>}

                </Window>
            }
        </div>
    );

};