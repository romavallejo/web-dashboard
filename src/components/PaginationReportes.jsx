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
    const [titleField,setTitlteField] = useState("");
    const [selectedCategories,setSelectedCategories] = useState([]);
    const [descriptionField,setDescriptionField] = useState("");
    const [linkField,setLinkField] = useState("");
    const [state,setState] = useState(1);
    const [user,setUser] = useState("");

    const [isEditReportOpen,setIsEditReportOpen] = useState(false);
    const [isViewReportOpen,setIsViewReportOpen] = useState(false);
    const [isDeleteOpen,setIsDeleteOpen] = useState(false);
    
    function viewReport(report) {
        setIsViewReportOpen(true);
        setTitlteField(report.title);
        setSelectedCategories(report.categories);
        setDescriptionField(report.description);
        setLinkField(report.report_url);
        setState(report.status);
        setUser(report.user_name);
        console.log(report.title);
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
                                    viewReport(row);
                                }}>
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
                    <Window title='Editar Reporte' onClose={()=>{
                        setTitlteField("");
                        setSelectedCategories([]);
                        setDescriptionField("");
                        setIsEditReportOpen(false);
                        setLinkField("");
                        setState(1);
                        }}>
                        <div className="window-layout">
                            <div className="text-holder edit-report-text">
                                <h4>Titulo del Reporte</h4>
                                <input placeholder='Titulo' value={titleField} onChange={e => setTitlteField(e.target.value)}/>
                                <p className='user-holder'>Nombre Usuario</p>
                                <h4>Categorias</h4>
                                <select className='toggle-select' onChange={e => {
                                    setSelectedCategories(prevItems => {
                                        if (e.target.value == 0)
                                            return [...prevItems];
                                        if (!prevItems.includes(e.target.value))
                                            return [...prevItems,e.target.value];
                                        return [...prevItems];
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
                                    {selectedCategories.map(id => {
                                        return <CategoryTag 
                                                key={id} 
                                                categoryName={categorias[id-1].name} 
                                                onDelete={() => {
                                                    setSelectedCategories(
                                                        (prevItems) => prevItems.filter(el => el !== id)
                                                    )
                                                }}
                                            />
                                    })}
                                </div>
                                <h4>Descripción del reporte</h4>
                                <textarea 
                                    className='edit-text' 
                                    value={descriptionField} 
                                    onChange={e => setDescriptionField(e.target.value)}
                                    rows={5}/>
                                <div className='liga-holder'>
                                    <h4>Liga Fraudulenta</h4>
                                    <input placeholder='https://ejemplo.com' value={linkField} onChange={e => setLinkField(e.target.value)}/>
                                </div>
                                <div className='categories-list report-state'>
                                    <button onClick={()=>setState(2)} className={`tag aceptado ${state === 2 ? 'selected' :''}`}>Aceptado</button>
                                    <button onClick={()=>setState(3)} className={`tag rechazado ${state === 3 ? 'selected' : ''}`}>Rechazado</button>
                                    <button onClick={()=>setState(1)} className={`tag revision ${state === 1 ? 'selected' : ''}`}>Pendiente</button>
                                </div>
                            </div>
                            <div className="image-holder">
                                <img className='report-image' src="/prueba.jpg"/>
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
                                <h3>{titleField}</h3>
                                <p className='user-holder'>{user}</p>
                                <div className='categories-list'>
                                    {selectedCategories.map(selectedCategory => {
                                        return (<p key={categorias[selectedCategory-1].name} className='tag'>{categorias[selectedCategory-1].name}</p>);
                                    })}
                                </div>
                                <p>{descriptionField}</p>
                                <div className='liga-holder'>
                                    <h4>Liga Fraudulenta</h4>
                                    <p>{linkField}</p>
                                </div>
                                <div className='report-state'>
                                    {
                                        state === 1 ? <p className='tag revision'>Pendiente</p> :
                                        state === 2 ? <p className='tag aceptado'>Aprobado</p> : 
                                        <p className='tag rechazado'>Aceptado</p>
                                    }
                                </div>
                            </div>
                            <div className='image-holder'>
                                <img className='report-image' src="/prueba.jpg"/>
                            </div>
                        </div>
                    </Window>
                }
                
                {isDeleteOpen && 
                    <Window title='Eliminar Reporte' onClose={()=>setIsDeleteOpen(false)}>
                        <div className='delete-report'>
                            <p>¿Seguro que desea eliminar el reporte con ID X?</p>
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
