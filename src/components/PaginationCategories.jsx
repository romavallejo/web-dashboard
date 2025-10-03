import { useState, useEffect } from 'react';
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
        setErrors({name:"",description:""});
    }

    //ERROR HANDLING
    const [errors,setErrors] = useState({});

    function validateInfo() {
        let newErrors = {};
        if (!categoryInfo.name.trim())
            newErrors.name = "El nombre de la categoría no puede estar vacío";
        else if (rows.some(el => el.name.trim().toLowerCase() === categoryInfo.name.trim().toLowerCase() && el.id !== categoryInfo.id))
            newErrors.name = "El nombre de la categoría ya existe";
        if (!categoryInfo.description.trim())
            newErrors.description = "La descripción de la categoría no puede estar vacía";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function updateCategory() {
        if (validateInfo()) {
            console.log("Se puede updatear el reporte");
            //FETCH HERE
        } else {
            console.log("Hay algun error");
        }
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
                            <h4>Titulo de Categoría</h4>
                            <input className='text-input' placeholder='Nombre' value={categoryInfo.name} onChange={e => {
                                setCategoryInfo(prev => ({...prev, name: e.target.value}));
                            }}/>

                            {errors.name && <p className='error-message'>* {errors.name}</p>}
                            {errors.repeatedName && <p className='error-message'>* {errors.repeatedName}</p>}

                            <h4>Descripción de Categoría</h4>
                            <textarea 
                                className='edit-text' 
                                value={categoryInfo.description} 
                                onChange={e => {
                                    setCategoryInfo(prev => ({...prev, description: e.target.value}));
                                }}
                                rows={5}/>

                            {errors.description && <p className='error-message'>* {errors.description}</p>}

                            <div className='save-changes'>
                                <button onClick={updateCategory}>Guardar cambios</button>
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
                            <p>¿Seguro que desea eliminar la categoría con ID {categoryInfo.id}?</p>
                            <div className='delete-category'>
                                <button onClick={()=>{
                                //LLAMADA PARA ELIMINAR CATEGORIA

                            }}>Eliminar</button>
                            </div>
                        </div>
                    </Window>
                }

            </table>
        </>
    );
}