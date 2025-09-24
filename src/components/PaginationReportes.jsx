import { useState } from 'react';
import Window from './Window';
import '../css/Pagination.css'

export default function PaginationReportes({ rows }) {

    const columns = ['ID','Usuario','Categoría','Estado','Fecha de Creación','Acciones'];
    const estadoClass = {
        'Aceptado': 'estado-aceptado',
        'En Revisión': 'estado-revision',
        'Rechazado': 'estado-rechazado'
    };

    const [isEditReportOpen,setIsEditReportOpen] = useState(false);
    const [isViewReportOpen,setIsViewReportOpen] = useState(false);
    const [isDeleteOpen,setIsDeleteOpen] = useState(false);

    function viewReport() {
        setIsViewReportOpen(true);
    }

    function editReport() {
        setIsEditReportOpen(true);
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
                            <td>{row.usuario}</td>
                            <td>
                                <div className='tag categoria'>
                                    {row.categoria} 
                                </div>
                            </td>
                            <td>
                                <div className={`tag ${estadoClass[row.estado] || ''}`}>
                                    {row.estado}
                                </div>
                            </td>
                            <td>{row.fechaCreacion}</td>
                            <td className='actions'>
                                <button onClick={viewReport}>
                                    <img src='/icons/view.svg'/>
                                </button>
                                <button onClick={editReport}>
                                    <img src='/icons/edit.svg'/>
                                </button>
                                <button onClick={()=>setIsDeleteOpen(true)}>
                                    <img src='/icons/delete.svg'/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                {isEditReportOpen && 
                    <Window title='Editar Reporte' onClose={()=>setIsEditReportOpen(false)}>

                    </Window>
                }
                {isViewReportOpen && 
                    <Window title='Reporte' onClose={()=>setIsViewReportOpen(false)}>

                    </Window>
                }
                {isDeleteOpen && 
                    <Window title='Eliminar Reporte' onClose={()=>setIsDeleteOpen(false)}>
                        
                    </Window>
                }
            </table>
        </>
    );
}
