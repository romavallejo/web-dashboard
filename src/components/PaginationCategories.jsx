import { useState } from 'react';
import Window from './Window';
import CategoryForm from './CategoryForm';
import { useCategory } from '../context/CategoryContext';
import '../css/Pagination.css'
import '../css/PaginationCategories.css'

export default function PaginationCategories() {

    const { filteredCategories, categoryInfo, setCategoryInfo, validateInfo, setErrors } = useCategory();

    const columns = ['ID','Nombre','Acciones']

    function hanldeSetCategoryInfo(category) {
        setCategoryInfo({
            id: category.id,
            name: category.name,
            description: category.description
        });
        setErrors({});
    }

    function updateCategory() {
        if (validateInfo()) {
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
                    {filteredCategories && filteredCategories.map(row => (
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
                                    setIsDeleteCategoryOpen(true);
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
                            onSubmit={updateCategory}
                            submitLabel='Guardar cambios'
                        />
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
                                <button onClick={deleteCategory}>Eliminar</button>
                            </div>
                        </div>
                    </Window>
                }

            </table>
        </>
    );
}