import { useState } from 'react';
import Window from './Window';
import Button from '../components/Button.jsx';
import CategoryForm from './CategoryForm';
import { useCategory } from '../context/CategoryContext';
import { updateExistingCategory, deleteExistingCategory } from '../api/categoryServices';
import { motion } from "framer-motion";
import '../css/Pagination.css'
import '../css/PaginationCategories.css'

export default function PaginationCategories({ rows, uponUpload }) {

    const { categoryInfo, setCategoryInfo, validateInfo, setErrors } = useCategory();

    const columns = ['ID','Nombre','Acciones']

    function hanldeSetCategoryInfo(category) {
        setCategoryInfo({
            id: category.id,
            name: category.name,
            description: category.description
        });
        setErrors({});
    }

    const [isEditCategoryOpen,setIsEditCategoryOpen] = useState(false);
    const [isViewCategoryOpen,setIsViewCategoryOpen] = useState(false);
    const [isDeleteCategoryOpen,setIsDeleteCategoryOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function updateCategory() {
        if (!validateInfo())
            return;
        setIsLoading(true);
        try {
            await updateExistingCategory(categoryInfo);
            await uponUpload();
            setIsEditCategoryOpen(false);
        } catch(err) {
            console.log(err);
            setErrors(prev=>({...prev,submit:"Error al momento de editar categoría"}));
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteCategory() {
        setIsLoading(true);
        try {
            await deleteExistingCategory(categoryInfo);
            await uponUpload();
            setIsDeleteCategoryOpen(false);
        } catch(err) {
            console.log(err);
            setErrors(prev=>({...prev,submit:"Error al momento de eliminar categoría"}));
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th className='id-col'>ID</th>
                        <th className='name-col'>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {rows && rows.map(row => (
                        <tr key={row.id}>
                            <td className='id-col'>{row.id}</td>
                            <td className='name-col'>{row.name}</td>
                            <td className='actions'>
                                <motion.button 
                                whileHover={{scale:1.1}}
                                onClick={()=>{
                                    hanldeSetCategoryInfo(row);
                                    setIsViewCategoryOpen(true);
                                }}>
                                    <img src='/icons/view.svg'/>
                                </motion.button>
                                <motion.button 
                                whileHover={{scale:1.1}}
                                onClick={()=>{
                                    hanldeSetCategoryInfo(row);
                                    setIsEditCategoryOpen(true);
                                }}>
                                    <img src='/icons/edit.svg'/>
                                </motion.button>
                                <motion.button 
                                whileHover={{scale:1.1}}
                                onClick={()=>{
                                    hanldeSetCategoryInfo(row);
                                    setIsDeleteCategoryOpen(true);
                                }}>
                                    <img src='/icons/delete.svg'/>
                                </motion.button>
                            </td>
                        </tr>
                    ))}
                </tbody>

                {isEditCategoryOpen &&
                    <Window title='Editar Cateogría' 
                        onClose={()=>setIsEditCategoryOpen(false)}
                        disableButton={isLoading}
                    >
                        <CategoryForm 
                            onSubmit={updateCategory}
                            submitLabel='Guardar cambios'
                            isUploading={isLoading}
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
                    <Window title='Eliminar Categoría' 
                        onClose={()=>setIsDeleteCategoryOpen(false)}
                        disableButton={isLoading}
                    >
                        <div className="window-content">
                            <div className='delete-category'>
                                <p className='delete-text'>¿Seguro que desea eliminar la categoría con ID {categoryInfo.id}?</p>
                                <Button
                                    onClick={deleteCategory}
                                    disable={isLoading}
                                    text='Eliminar Categoría'
                                    icon='/icons/delete-forever.svg'
                                    style='delete'
                                />
                                {isLoading && <p>Eliminando cateogría...</p>}
                            </div>             
                        </div>
                    </Window>
                }

            </table>
        </>
    );
}