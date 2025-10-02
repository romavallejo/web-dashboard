import { useState } from 'react';
import Window from './Window';
import '../css/Pagination.css'
import '../css/PaginationCategories.css'

export default function PaginationCategories({ rows }) {

    const columns = ['ID','Nombre','Acciones']

    //STATES FOR EDIT CATEGORY
    const [categoryInfo,setCategoryInfo] = useState({
        id: 0,
        name: "",
        description: ""
    });

    function hanldeSetCategoryInfo(category) {
        setCategoryInfo({
            id: category.id,
            name: category.name,
            description: category.description
        });
    }

    const [isEditCategoryOpen,setIsEditCategoryOpen] = useState(false);
    const [isViewCategoryOpen,setIsViewCategoryOpen] = useState(false);
    const [isDeleteCategoryOpen,setIsDeleteCategoryOpen] = useState(false);

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
                            <td>{row.name}</td>
                            <td className='actions'>
                                <button onClick={()=>{
                                    hanldeSetCategoryInfo(row);
                                    setIsViewCategoryOpen(true);
                                }}>
                                    <img src='/icons/view.svg'/>
                                </button>
                                <button onClick={()=>{
                                    hanldeSetCategoryInfo(row);
                                    setIsEditCategoryOpen(true);
                                }}>
                                    <img src='/icons/edit.svg'/>
                                </button>
                                <button onClick={()=>{
                                    hanldeSetCategoryInfo(row);
                                    setIsDeleteCategoryOpen(true)
                                }}>
                                    <img src='/icons/delete.svg'/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

                {isEditCategoryOpen &&
                    <Window title='Editar Cateogría' onClose={()=>setIsEditCategoryOpen(false)}>
                        <div className='window-content'>
                            <h4>Titulo del Reporte</h4>
                            <input placeholder='Nombre' value={categoryInfo.name} onChange={e => setCategoryInfo(prev => ({...prev, name: e.target.value}))}/>
                            <h4>Descripción del reporte</h4>
                            <textarea 
                                className='edit-text' 
                                value={categoryInfo.description} 
                                onChange={e => setCategoryInfo(prev => {return {...prev, description: e.target.value}})}
                                rows={5}/>
                            <div className='save-changes'>
                                <button onClick={ //call to save changes
                                    console.log()
                                }>Guardar cambios</button>
                            </div>
                        </div>
                    </Window>
                }

                {isViewCategoryOpen && 
                    <Window title='Categoría' onClose={()=>setIsViewCategoryOpen(false)}>
                        <div className="window-content">
                            <h3>{categoryInfo.name}</h3>
                            <p>{categoryInfo.description}</p>
                        </div>
                    </Window>
                }

                {isDeleteCategoryOpen &&
                    <Window title='Eliminar Categoría' onClose={()=>setIsDeleteCategoryOpen(false)}>
                        <div className="window-content">
                            <p>¿Seguro que desea eliminar el reporte con ID {categoryInfo.id}?</p>
                            <div className='delete-category'>
                                <button onClick={()=>{
                                //llamado a funcion para eliminar reporte
                                    
                            }}>Eliminar</button>
                            </div>
                            
                        </div>
                    </Window>
                }

            </table>
        </>
    );
}