import { useState } from 'react';
import Window from './Window';
import Button from './Button.jsx';
import '../css/Pagination.css'
import { formatDate } from '../utils/formatDate.js'
import ReportForm from './ReportForm.jsx';
import ViewReport from './ViewReport.jsx';
import { useReport } from '../context/ReportContext.jsx';
import { onCommittingReport, onCancelReport} from '../utils/imageLogic.js'
import { updateReport, deleteReportService } from '../api/reportServices.js';
import { motion } from 'framer-motion';

export default function PaginationReportes({ rows, uponUpload, categorias, categoryMap }) {

    const { reportInfo ,setReportInfo, errors, setErrors, validateInfo } = useReport();

    const estadoClass = {
        1: 'estado-revision',
        2: 'estado-aceptado',
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
                user: report.user_name,
                created_at: report.created_at,
                created_by: report.created_by
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
            await uponUpload();
            setIsEditReportOpen(false);
        } catch(err) {
            console.log(err);
            if (err.message?.includes("report_url must be a URL address")){
                setErrors(prev=>({...prev, link: "Debe ser una URL válida"}));
                return;
            }
            setErrors(prev=>({...prev, submit:"Error al momento de subir"}));
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteReport() {
        setIsLoading(true);
        try {
            await deleteReportService(reportInfo);
            setIsDeleteOpen(false);
            await uponUpload();
        } catch(err) {
            console.log(err);
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
                        <th>ID</th>
                        <th className='user-col'>Usuario</th>
                        <th className='category-col'>Categoría</th>
                        <th>Estado</th>
                        <th className='date-col'>Fecha de Cración</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {rows && rows.map(row => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td className='user-col'>{row.user_name}</td>
                            <td className='categories-list category-col'>
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
                            <td className='date-col'>{formatDate(row.created_at)}</td>
                            <td className='actions'>
                                <motion.button 
                                whileHover={{scale:1.1}}
                                onClick={()=>{
                                    handleSetReportInfo(row);
                                    setIsViewReportOpen(true);
                                }}>
                                    <img src='/icons/view.svg'/>
                                </motion.button>
                                <motion.button 
                                whileHover={{scale:1.1}}
                                onClick={()=>{
                                    handleSetReportInfo(row);
                                    setIsEditReportOpen(true);
                                    setErrors({});
                                }}>
                                    <img src='/icons/edit.svg'/>
                                </motion.button>
                                <motion.button 
                                whileHover={{scale:1.1}}
                                onClick={()=>{
                                    handleSetReportInfo(row);
                                    setIsDeleteOpen(true);
                                    setErrors({});
                                }}>
                                    <img src='/icons/delete.svg'/>
                                </motion.button>
                            </td>
                        </tr>
                    ))}
                </tbody>

                {isEditReportOpen && 
                    <Window title={`Editar Reporte | ID ${reportInfo.id} | ${formatDate(reportInfo.created_at)}`} onClose={()=>{
                        setIsEditReportOpen(false);
                        onCancelReport(reportInfo);
                        }}
                        disableButton={isLoading}
                    >
                        <ReportForm 
                            onSubmit={editReport}
                            submitLabel='Guardar cambios'
                            categories={categorias}
                            categoryMap={categoryMap}
                            isUploading={isLoading}
                        />

                        <div className='delete-report'>
                            {isLoading && <p>Editando reporte...</p>}
                        </div>

                    </Window>
                }

                {isViewReportOpen && 
                    <Window title={`Reporte | ID ${reportInfo.id} | ${formatDate(reportInfo.created_at)}`} onClose={()=>{setIsViewReportOpen(false)}}>
                        <ViewReport 
                            categoryMap={categoryMap}
                        />
                    </Window>
                }
                
                {isDeleteOpen && 
                    <Window title={`Eliminar Reporte | ID ${reportInfo.id} | ${formatDate(reportInfo.created_at)}`} 
                        onClose={()=>setIsDeleteOpen(false)}
                        disableButton={isLoading}
                    >
                        <div className='delete-report'>
                            <p className='delete-text'>¿Seguro que desea eliminar el reporte con ID {reportInfo.id}?</p>
                            <Button 
                                onClick={deleteReport}
                                disable={isLoading}
                                text="Eliminar Reporte"
                                style="delete"
                                icon="/icons/delete-forever.svg"
                            />

                            {isLoading && <p>Eliminando reporte...</p>}
                            {errors.submit && <p className='error-message'>* {errors.submit}</p>}

                        </div>
                    </Window>
                }
            </table>
        </>
    );
}
