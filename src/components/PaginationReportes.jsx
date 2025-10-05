import { useState } from 'react';
import Window from './Window';
import '../css/Pagination.css'
//import '../css/PaginationReportes.css'
import { formatDate } from '../utils/formatDate.js'
import ReportForm from './ReportForm.jsx';
import ViewReport from './ViewReport.jsx';

export default function PaginationReportes({ rows, categorias, reportInfoState, setReportInfoState, errorState, validateInfoFunction }) {

    const columns = ['ID','Usuario','Categoría','Estado','Fecha de Creación','Acciones'];
    const estadoClass = {
        2: 'estado-aceptado',
        1: 'estado-revision',
        3: 'estado-rechazado'
    };
    
    function handleSetReportInfo(report) {
            setReportInfoState(prev=>({
                id: report.id,
                title: report.title,
                image: report.image,
                categories: report.categories,
                description: report.description,
                link: report.report_url,
                status: report.status,
                user: report.user_name
            }));
    }

    const [isEditReportOpen,setIsEditReportOpen] = useState(false);
    const [isViewReportOpen,setIsViewReportOpen] = useState(false);
    const [isDeleteOpen,setIsDeleteOpen] = useState(false);

    function editReport() {
        if (validateInfoFunction()) {

        } else {
            
        }
    }

    function deleteReport() {

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
                                {row.categories.map(category =>
                                    <div className='tag categoria'>
                                        {categorias[category-1].name} 
                                    </div>
                                )}
                            </td>
                            <td>
                                <div className={`tag ${estadoClass[row.status] || ''}`}>
                                    {row.status === 1 ? 'Pendiente' : row.status === 2 ? 'Aprobado' : 'Rechazado'}
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
                                }}>
                                    <img src='/icons/edit.svg'/>
                                </button>
                                <button onClick={()=>{
                                    handleSetReportInfo(row);
                                    setIsDeleteOpen(true);
                                }}>
                                    <img src='/icons/delete.svg'/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

                {isEditReportOpen && 
                    <Window title='Editar Reporte' onClose={()=>{setIsEditReportOpen(false);}}>
                        <ReportForm 
                            reportInfoState={reportInfoState}
                            setReportInfoState={setReportInfoState}
                            onSubmit={editReport}
                            errorState={errorState}
                            submitLabel='Guardar cambios'
                            categories={categorias}
                        />
                    </Window>
                }

                {isViewReportOpen && 
                    <Window title='Reporte' onClose={()=>{setIsViewReportOpen(false)}}>
                        <ViewReport 
                            reportInfoState={reportInfoState}
                            categories={categorias}
                        />
                    </Window>
                }
                
                {isDeleteOpen && 
                    <Window title='Eliminar Reporte' onClose={()=>setIsDeleteOpen(false)}>
                        <div className='delete-report'>
                            <p>¿Seguro que desea eliminar el reporte con ID {reportInfoState.id}?</p>
                            <button onClick={deleteReport}>Eliminar</button>
                        </div>
                    </Window>
                }
            </table>
        </>
    );
}
