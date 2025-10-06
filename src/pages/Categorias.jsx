import '../css/pageBase.css'
import '../css/PaginationCategories.css'
import Card from '../components/Card.jsx'
import CategoryForm from '../components/CategoryForm.jsx';
import PaginationCategories from '../components/PaginationCategories.jsx';
import Window from '../components/Window.jsx';
import SearchBar from '../components/SearchBar.jsx';
import PaginationControls from '../components/PaginationControls.jsx';
import { useState, useEffect } from 'react';
import { useCategory } from '../context/CategoryContext.jsx';
import { getCategories } from '../api/categoryServices.js';

export default function Categorias() {

    const [categories,setCategories] = useState([]);

    useEffect(()=>{
    
            const fetchCategories = async () => {
                try {
                    const reportsRes = await getCategories();
                    setCategories(reportsRes);
                } catch (err) {
                    console.error("Failed to fetch reports:", err);
                }
            }
            fetchCategories();
    
        },[])

    const { setCategoryInfo, setErrors, validateInfo, filteredCategories,setFilteredCategories, setAllCategories} = useCategory();

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

        function createCategory() {
        if (validateInfo()) {
            console.log("Se puede subir la cateogira");
            //fetch call here
        } else {
            //
        }
    }

    const [isCreateCategoryOpen,setIsCreateCategoryOpen] = useState(false);

    return (
        <div className="page">
            <div className='header'>
                <h1>Categorías</h1>
                <button onClick={()=>{
                    setIsCreateCategoryOpen(true);
                    setCategoryInfo({
                        id: 0,
                        name: "",
                        description: ""
                    });
                    setErrors({});
                }}>+ Crear Categoría</button>
            </div>
            <div className="grid">
                <Card title="Lista de Categorías" size={[1,4]}>
                    <div className='filter-fields'>
                        <SearchBar onSearch={handleSearch} holder='ID, Nombre'/>
                    </div>
                    <PaginationCategories
                        rows={paginatedCategories}
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
                }}>
                    <CategoryForm
                        onSubmit={createCategory}
                        submitLabel='Crear Categoría'
                    />
                </Window>
            }
        </div>
    );

};