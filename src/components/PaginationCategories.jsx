import { useState, useEffect } from 'react';
import Window from './Window';
import CategoryForm from './CategoryForm';
import '../css/Pagination.css'
import '../css/PaginationCategories.css'

export default function PaginationCategories({ rows, categoryInfoState, setCategoryInfoState, errorState, setErrorState, validateInfoFunction }) {

    const columns = ['ID','Nombre','Acciones']

    function hanldeSetCategoryInfo(category) {
        setCategoryInfoState({
            id: category.id,
            name: category.name,
            description: category.description
        });
        setErrorState({name:"",description:""});
    }

    function updateCategory() {
        if (validateInfoFunction()) {
            console.log("Se puede updatear el reporte");
            //FETCH HERE
        } else {
            console.log("Hay algun error");
        }
    }

    function deleteCategory() {
        // call to delete category here
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
                        <CategoryForm 
                            categoryInfoState={categoryInfoState}
                            setCategoryInfoState={setCategoryInfoState}
                            onSubmit={updateCategory}
                            errorState={errorState}
                            submitLabel='Guardar cambios'
                        />
                    </Window>
                }

                {isViewCategoryOpen && 
                    <Window title='Categoría' onClose={()=>setIsViewCategoryOpen(false)}>
                        <div className="window-content">
                            <h3>{categoryInfoState.name}</h3>
                            <p>{categoryInfoState.description}</p>
                        </div>
                    </Window>
                }

                {isDeleteCategoryOpen &&
                    <Window title='Eliminar Categoría' onClose={()=>setIsDeleteCategoryOpen(false)}>
                        <div className="window-content">
                            <p>¿Seguro que desea eliminar la categoría con ID {categoryInfoState.id}?</p>
                            <div className='delete-category'>
                                <button onClick={deleteCategory}>Eliminar</button>
                            </div>
                        </div>
                    </Window>
                }

            </table>
        </>
    );
}