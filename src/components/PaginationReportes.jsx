import { use, useState } from 'react';
import Window from './Window';
import CategoryTag from './CategoryTag';
import '../css/Pagination.css'
import '../css/PaginationReportes.css'

export default function PaginationReportes({ rows, categorias }) {

    const columns = ['ID','Usuario','Categoría','Estado','Fecha de Creación','Acciones'];
    const estadoClass = {
        2: 'estado-aceptado',
        1: 'estado-revision',
        3: 'estado-rechazado'
    };
   
    //STATES FOR EDIT REPORTE
    const [reportInfo,setReportInfo] = useState({
        id: 1,
        title: "",
        image: "",
        categories: [],
        description: "",
        link: "",
        status: 1,
        user: ""
    });
    
    function handleSetReportInfo(report) {
            setReportInfo({
                id: report.id,
                title: report.title,
                image: report.image,
                categories: report.categories,
                description: report.description,
                link: report.report_url,
                status: report.status,
                user: report.user_name
            });
        }

    const [isEditReportOpen,setIsEditReportOpen] = useState(false);
    const [isViewReportOpen,setIsViewReportOpen] = useState(false);
    const [isDeleteOpen,setIsDeleteOpen] = useState(false);

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
                            <td>
                                <div className='tag categoria'>
                                    {categorias[row.categories[0]].name} 
                                </div>
                            </td>
                            <td>
                                <div className={`tag ${estadoClass[row.status] || ''}`}>
                                    {row.status === 1 ? 'Pendiente' : row.status === 2 ? 'Aprobado' : 'Rechazado'}
                                </div>
                            </td>
                            <td>{row.created_at}</td>
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
                        <div className="window-layout">
                            <div className="text-holder edit-report-text">
                                <h4>Titulo del Reporte</h4>
                                <input placeholder='Titulo' value={reportInfo.title} onChange={e => setReportInfo(prev => ({...prev, title: e.target.value}))}/>
                                <p className='user-holder'>{reportInfo.user}</p>
                                <h4>Categorias</h4>
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
                                        categorias.map(category =>
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        )
                                    }
                                </select>
                                <div className='categories-list'>
                                    {
                                        reportInfo.categories.map(id => {
                                            return <CategoryTag 
                                                key={id} 
                                                categoryName={categorias[id-1].name} 
                                                onDelete={() => {
                                                    setReportInfo(prev =>{
                                                        return {...prev, categories: prev.categories.filter(el => el !== id)}
                                                    }
                                                        
                                                    )
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
                                    <input placeholder='https://ejemplo.com' value={reportInfo.link} onChange={e => setReportInfo(prev => {return {...prev, link: e.target.value}})}/>
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
                            <button onClick={
                                console.log()
                            }>Guardar cambios</button>
                        </div>
                    </Window>
                }

                {isViewReportOpen && 
                    <Window title='Reporte' onClose={()=>{setIsViewReportOpen(false)}}>
                        <div className='window-layout'>
                            <div className='text-holder'>
                                <h3>{reportInfo.title}</h3>
                                <p className='user-holder'>{reportInfo.user}</p>
                                <div className='categories-list'>
                                    {reportInfo.categories.map(selectedCategory => {
                                        return (<p key={categorias[selectedCategory-1].name} className='tag'>{categorias[selectedCategory-1].name}</p>);
                                    })}
                                </div>
                                <p>{reportInfo.description}</p>
                                <div className='liga-holder'>
                                    <h4>Liga Fraudulenta</h4>
                                    <p>{reportInfo.link}</p>
                                </div>
                                <div className='report-state'>
                                    {
                                        reportInfo.status === 1 ? <p className='tag revision'>Pendiente</p> :
                                        reportInfo.status === 2 ? <p className='tag aceptado'>Aprobado</p> : 
                                        <p className='tag rechazado'>Aceptado</p>
                                    }
                                </div>
                            </div>
                            <div className='image-holder'>
                                <img className='report-image' src={reportInfo.image}/>
                            </div>
                        </div>
                    </Window>
                }
                
                {isDeleteOpen && 
                    <Window title='Eliminar Reporte' onClose={()=>setIsDeleteOpen(false)}>
                        <div className='delete-report'>
                            <p>¿Seguro que desea eliminar el reporte con ID {reportInfo.id}?</p>
                            <button onClick={()=>{
                                //llamado a funcion para eliminar reporte

                            }}>Eliminar</button>
                        </div>
                    </Window>
                }
            </table>
        </>
    );
}
