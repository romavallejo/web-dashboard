import { useState } from 'react';
import Window from './Window';
import '../css/Pagination.css'
//import '../css/PaginationReportes.css'
import { formatDate } from '../utils/formatDate.js'
import ReportForm from './ReportForm.jsx';
import ViewReport from './ViewReport.jsx';
import { useReport } from '../context/ReportContext.jsx';
import { onCommittingReport, onCancelReport} from '../utils/imageLogic.js'
import { updateReport, deleteReportService } from '../api/reportServices.js';

export default function PaginationReportes({ rows, uponUpload, categorias, categoryMap }) {

    const { reportInfo ,setReportInfo, errors, setErrors, validateInfo } = useReport();

    const columns = ['ID','Usuario','Categoría','Estado','Fecha de Creación','Acciones'];
    const estadoClass = {
        2: 'estado-aceptado',
        1: 'estado-revision',
        3: 'estado-rechazado'
    };
    
    function handleSetReportInfo(report) {
            setReportInfo(prev=>({
                ...prev,
                id: report.id,
                title: report.title,
                image: report.image,
                startImage: report.image,
                categories: report.categories,
                description: report.description,
                link: report.report_url,
                status_id: report.status_id,
                user: report.user_name
            }));
    }

    const [isEditReportOpen,setIsEditReportOpen] = useState(false);
    const [isViewReportOpen,setIsViewReportOpen] = useState(false);
    const [isDeleteOpen,setIsDeleteOpen] = useState(false);

    const [isLoading,setIsLoading] = useState(false);

    async function editReport() {
        if (!validateInfo())
            return;
        setIsLoading(true);
        try {
            await updateReport(reportInfo);
            await onCommittingReport(reportInfo);
            setIsEditReportOpen(false);
        } catch(err) {
            console.log(err);
            setErrors(prev=>({...prev, submit:"Error al momento de subir"}));
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteReport() {
        setIsLoading(true);
        try {
            const res = await deleteReportService(reportInfo);
            console.log(res);
            setIsDeleteOpen(false);
            uponUpload();
        } catch(err) {
            setErrors(prev=>({...prev,submit:"Error al momento de subir"}));
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th key={col}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows && rows.map(row => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.user_name}</td>
                            <td className='categories-list'>
                                {row.categories.map(categoryId =>
                                    <div key={categoryId} className='tag categoria'>
                                        {categoryMap[categoryId] || "Desconocida"}
                                    </div>
                                )}
                            </td>
                            <td>
                                <div className={`tag ${estadoClass[row.status_id] || ''}`}>
                                    {row.status_id === 1 ? 'Pendiente' : row.status_id === 2 ? 'Aprobado' : 'Rechazado'}
                                </div>
                            </td>
                            <td>{formatDate(row.created_at)}</td>
                            <td className='actions'>
                                <button onClick={()=>{
                                    handleSetReportInfo(row);
                                    setIsViewReportOpen(true);
                                }}>
                                    <img src='/icons/view.svg'/>
                                </button>
                                <button onClick={()=>{
                                    handleSetReportInfo(row);
                                    setIsEditReportOpen(true);
                                    setErrors({});
                                }}>
                                    <img src='/icons/edit.svg'/>
                                </button>
                                <button onClick={()=>{
                                    handleSetReportInfo(row);
                                    setIsDeleteOpen(true);
                                    setErrors({});
                                }}>
                                    <img src='/icons/delete.svg'/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

                {isEditReportOpen && 
                    <Window title='Editar Reporte' onClose={()=>{
                        setIsEditReportOpen(false);
                        onCancelReport(reportInfo);
                    }}>
                        <ReportForm 
                            onSubmit={editReport}
                            submitLabel='Guardar cambios'
                            categories={categorias}
                            categoryMap={categoryMap}
                        />

                        {isLoading && <p>Editando reporte...</p>}

                    </Window>
                }

                {isViewReportOpen && 
                    <Window title='Reporte' onClose={()=>{setIsViewReportOpen(false)}}>
                        <ViewReport 
                            categoryMap={categoryMap}
                        />
                    </Window>
                }
                
                {isDeleteOpen && 
                    <Window title='Eliminar Reporte' onClose={()=>setIsDeleteOpen(false)}>
                        <div className='delete-report'>
                            <p className='delete-text'>¿Seguro que desea eliminar el reporte con ID {reportInfo.id}?</p>
                            <button onClick={deleteReport}>Eliminar</button>

                            {isLoading && <p>Eliminando reporte...</p>}
                            {errors.submit && <p className='error-message'>* {errors.submit}</p>}

                        </div>
                    </Window>
                }
            </table>
        </>
    );
}
