import '../css/pageBase.css'
import '../css/PaginationCategories.css'
import Card from '../components/Card.jsx'
import CategoryForm from '../components/CategoryForm.jsx';
import PaginationCategories from '../components/PaginationCategories.jsx';
import Window from '../components/Window.jsx';
import SearchBar from '../components/SearchBar.jsx';
import PaginationControls from '../components/PaginationControls.jsx';
import { useState, useEffect } from 'react';

export default function Categorias() {

        let categories = [
    {
        "id": 1,
        "name": "Electrodomésticos",
        "description": "Aparatos para el hogar que facilitan las tareas diarias, como refrigeradores, lavadoras o microondas."
    },
    {
        "id": 2,
        "name": "Muebles",
        "description": "Artículos para amueblar y decorar espacios, incluyendo mesas, sillas, sofás y camas."
    },
    {
        "id": 3,
        "name": "Ropa",
        "description": "Prendas de vestir para diferentes estilos, climas y ocasiones."
    },
    {
        "id": 4,
        "name": "Electrónica",
        "description": "Dispositivos tecnológicos como celulares, computadoras, televisores y accesorios."
    },
    {
        "id": 5,
        "name": "Libros",
        "description": "Obras impresas o digitales que abarcan géneros de ficción, no ficción, educación y más."
    },
    {
        "id": 6,
        "name": "Juguetes",
        "description": "Artículos diseñados para la diversión y el aprendizaje de niños de todas las edades."
    },
    {
        "id": 7,
        "name": "Deportes",
        "description": "Equipo, ropa y accesorios relacionados con la práctica y disfrute de actividades deportivas."
    }
]

    //FILTER TEXT
    const [textFilter,setTextFilter] = useState("");
    const [filteredCategories,setFilteredCategories] = useState([]);
    const handleSearch = text => {
        setTextFilter(text);
    }

    //ERROR HANDLING
    const [errors,setErrors] = useState({});
    function validateInfo() {
        let newErrors = {};
        if (!categoryInfo.name.trim())
            newErrors.name = "El nombre de la categoría no puede estar vacío";
        else if (categories.some(el => el.name.trim().toLowerCase() === categoryInfo.name.trim().toLowerCase() && el.id !== categoryInfo.id))
            newErrors.name = "El nombre de la categoría ya existe";
        if (!categoryInfo.description.trim())
            newErrors.description = "La descripción de la categoría no puede estar vacía";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function createCategory() {
        if (validateInfo()) {
            console.log("Se puede subir la cateogira");
            //fetch call here
        } else {
            //
        }
    }

    //PAGINATION
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
        
    },[textFilter]);

    //STATES FOR EDIT CATEGORY
    const [categoryInfo,setCategoryInfo] = useState({
        id: 0,
        name: "",
        description: ""
    });

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
                }}>+ Crear Categoría</button>
            </div>
            <div className="grid">
                <Card title="Lista de Categorías" size={[1,4]}>
                    <div className='filter-fields'>
                        <SearchBar onSearch={handleSearch} holder='ID, Nombre'/>
                    </div>
                    <PaginationCategories 
                        rows={paginatedCategories} 
                        categoryInfoState={categoryInfo}
                        setCategoryInfoState={setCategoryInfo}
                        errorState={errors} 
                        setErrorState={setErrors}
                        validateInfoFunction={validateInfo}/>
                    <PaginationControls 
                        pagination={pagination}
                        onPageChange={setPagination}
                    />
                </Card>
            </div>

            {isCreateCategoryOpen &&
                <Window title='Crear Cateogría' onClose={()=>{
                    setIsCreateCategoryOpen(false);
                    setErrors({});
                }}>
                    <CategoryForm 
                        categoryInfoState={categoryInfo}
                        setCategoryInfoState={setCategoryInfo}
                        onSubmit={createCategory}
                        errorState={errors}
                        submitLabel='Crear Categoría'
                    />
                </Window>
            }
        </div>
    );

};