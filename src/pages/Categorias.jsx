import Card from '../components/Card.jsx'
import CategoryForm from '../components/CategoryForm.jsx';
import PaginationCategories from '../components/PaginationCategories.jsx';
import Window from '../components/Window.jsx';
import SearchBar from '../components/SearchBar.jsx';
import PaginationControls from '../components/PaginationControls.jsx';
import Button from '../components/Button.jsx';
import { useState, useEffect } from 'react';
import { useCategory } from '../context/CategoryContext.jsx';
import { getCategories, createNewCategory } from '../api/categoryServices.js';
import '../css/pageBase.css'
import '../css/PaginationCategories.css'

export default function Categorias() {

    const [categories,setCategories] = useState([]);
    const fetchCategories = async () => {
        try {
            const reportsRes = await getCategories();
            setCategories(reportsRes);
        } catch (err) {
            console.error("Failed to fetch reports:", err);
        }
    }
    useEffect(()=>{    
        fetchCategories();
        },[])

    const { categoryInfo ,setCategoryInfo, setErrors, validateInfo, filteredCategories,setFilteredCategories, setAllCategories} = useCategory();

    useEffect(()=>{
        setAllCategories(categories);
    },[categories]);

    //FILTER TEXT PAGINATION
    const [textFilter,setTextFilter] = useState("");
    const handleSearch = text => {
        setTextFilter(text);
    }
    const [pagination,setPagination] = useState({
        currentPage: 1,
        totalPages: 1
    });
    const categoriesPerPage = 20;
    const startIndex = (pagination.currentPage - 1) * categoriesPerPage;
    const endIndex = (startIndex + categoriesPerPage);
    const paginatedCategories = filteredCategories.slice(startIndex,endIndex);

    useEffect(()=>{
        let result = categories;

        if (textFilter.trim() !== "")
            result = result.filter(cat => cat.id.toString().includes(textFilter.toLocaleLowerCase()) ||
            cat.name.toLocaleLowerCase().includes(textFilter.toLocaleLowerCase())
        ); 
        
        setFilteredCategories(result);

        setPagination({
            totalPages:Math.ceil(result.length/categoriesPerPage),
            currentPage: 1
        });
        
    },[textFilter, categories]);

    const [isCreateCategoryOpen,setIsCreateCategoryOpen] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    async function createCategory() {
        if (!validateInfo())
            return;
        setIsLoading(true);
        try {
            await createNewCategory(categoryInfo);
            await fetchCategories();
            setIsCreateCategoryOpen(false);
        } catch(err) {
            console.log(err);
            setErrors(prev=>({...prev,submit:"Error al momento de subir"}));
        } finally {
            setIsLoading(false);
        }
        
    }

    return (
        <div className="page">
            <div className='header'>
                <h1>Categorías</h1>
                <Button 
                    icon='/icons/create.svg'
                    text='Crear Categoría'
                    onClick={()=>{
                        setIsCreateCategoryOpen(true);
                        setCategoryInfo({
                            id: 0,
                            name: "",
                            description: ""
                        });
                        setErrors({});}}
                />
            </div>
            <div className="grid">
                <Card title="Lista de Categorías" size={[1,4]} icon='/icons/category-sec.svg'>
                    <div className='filter-fields'>
                        <SearchBar onSearch={handleSearch} holder='ID, Nombre'/>
                    </div>
                    <PaginationCategories
                        rows={paginatedCategories}
                        uponUpload={fetchCategories}
                    />
                    <PaginationControls 
                        pagination={pagination}
                        onPageChange={setPagination}
                    />
                </Card>
            </div>

            {isCreateCategoryOpen &&
                <Window title='Crear Cateogría' onClose={()=>{
                    setIsCreateCategoryOpen(false);
                    }}
                    disableButton={isLoading}
                >
                    <CategoryForm
                        onSubmit={createCategory}
                        submitLabel='Crear Categoría'
                        isUploading={isLoading}
                    />
                </Window>
            }
        </div>
    );

};