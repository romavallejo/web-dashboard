import Card from '../components/Card.jsx'
import Window from '../components/Window.jsx'
import PaginationReportes from '../components/PaginationReportes.jsx'
import SearchBar from '../components/SearchBar.jsx'
import CategoryTag from '../components/CategoryTag.jsx'
import { use, useState } from 'react'
import '../css/pageBase.css'
import '../css/Reportes.css'

export default function Reportes(){

    const [isCreateReportOpen,setIsCreateReportOpen] = useState(false);
    const [searchFilter,setSearchFilter] = useState("");
    const [dateFilter,setDateFilter] = useState("");

    //STATES FOR CREATING NEW REPORTES
    const [titleField,setTitlteField] = useState("");
    const [selectedCategories,setSelectedCategories] = useState([]);
    const [descriptionField,setDescriptionField] = useState("");
    const [linkField,setLinkField] = useState("");
    const [state,setState] = useState(1);

    const handleSearch = text => { //later get rid of this and use setSearchFilter direclty bellow
        setSearchFilter(text);
        console.log(text);
    }

    const paginationRows = [
        {id:'1',usuario:'pepe23',categoria:'Ropa',estado:1,fechaCreacion:'27/03/2028'},
        {id:'2',usuario:'juan',categoria:'Comida',estado:2,fechaCreacion:'15/11/2026'},
        {id:'3',usuario:'noel',categoria:'Coches',estado:3,fechaCreacion:'15/11/2026'},
    ]

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

    return (
        <div>
            <div className="page">
                <div className='header'>
                    <h1>Reportes</h1>
                    <button onClick={()=>setIsCreateReportOpen(true)}>+ Crear Reporte</button>
                </div>
                <div className="grid">
                    <Card title='Total Reportes'>
                        <p className="number">27</p>
                    </Card>
                    <Card title='Aprobado'>
                        <p className="number aceptado">8</p>
                    </Card>
                    <Card title='Rechazados'>
                        <p className="number rechazado">19</p>
                    </Card>
                    <Card title='Pendiente'>
                        <p className="number revision">0</p>
                    </Card>
                    <Card title='Lista de Reportes' size={[1,4]}>
                        <div className='search-bar'>
                            <SearchBar onSearch={handleSearch} />
                            <select className='toggle-select'>
                                <option value='0'>Todos los Estados</option>
                                <option value='1'>Pendientes</option>
                                <option value='2'>Aprobados</option>
                                <option value='3'>Rechazados</option>
                            </select>
                            <select className='toggle-select'>
                                <option value='0'>Todas las Categorias</option>
                                {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                            </select>
                            <input 
                                className='toggle-select' 
                                type="date" 
                                value={dateFilter}
                                onChange={e => setDateFilter(e.target.value)}
                                />
                        </div>
                        <PaginationReportes rows={paginationRows} categorias={categories}/>
                        pages options here
                    </Card>
                </div>
            </div>

            {isCreateReportOpen &&
                <Window title="Crear Reporte" onClose={()=>{
                    setIsCreateReportOpen(false)
                    setTitlteField("");
                    setSelectedCategories([]);
                    setDescriptionField("");
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
                                    categories.map(category =>
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    )
                                }
                            </select>
                            <div className='categories-list'>
                                {selectedCategories.map(id => {
                                    return <CategoryTag 
                                            key={id} 
                                            categoryName={categories[id-1].name} 
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
                        <button onClick={()=>{
                            //CALL FOR THE POST ENDPOINT OF REPORTE
                        }}>Crear Reporte</button>
                    </div>
                </Window>
            }
        </div>
    );

};