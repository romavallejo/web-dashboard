import { use, useState } from 'react';
import Window from './Window';
import CategoryTag from './CategoryTag';
import '../css/Pagination.css'
import '../css/PaginationReportes.css'

export default function PaginationReportes({ rows }) {

    const columns = ['ID','Usuario','Categoría','Estado','Fecha de Creación','Acciones'];
    const estadoClass = {
        'Aceptado': 'estado-aceptado',
        'En Revisión': 'estado-revision',
        'Rechazado': 'estado-rechazado'
    };

    //categories var here
    let categorias = [
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
    //reports var here

    //STATES FOR EDIT REPORTE
    const [titleField,setTitlteField] = useState("");
    const [selectedCategories,setSelectedCategories] = useState([]);
    const [descriptionField,setDescriptionField] = useState("");
    const [linkField,setLinkField] = useState("");
    const [state,setState] = useState(1);

    const [isEditReportOpen,setIsEditReportOpen] = useState(false);
    const [isViewReportOpen,setIsViewReportOpen] = useState(false);
    const [isDeleteOpen,setIsDeleteOpen] = useState(false);

    function viewReport() {
        setIsViewReportOpen(true);
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
                            <td>{row.usuario}</td>
                            <td>
                                <div className='tag categoria'>
                                    {row.categoria} 
                                </div>
                            </td>
                            <td>
                                <div className={`tag ${estadoClass[row.estado] || ''}`}>
                                    {row.estado}
                                </div>
                            </td>
                            <td>{row.fechaCreacion}</td>
                            <td className='actions'>
                                <button onClick={viewReport}>
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
                        setTitlteField("")
                        setSelectedCategories([]);
                        setIsEditReportOpen(false);
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
                                    <input placeholder='Titulo' value={titleField} onChange={e => setTitlteField(e.target.value)}/>
                                </div>
                                <div className='categories-list report-state'>
                                    <button onClick={()=>setState(1)} className={`tag aceptado ${state === 1 ? 'selected' : ''}`}>Aceptado</button>
                                    <button onClick={()=>setState(2)} className={`tag rechazado ${state === 2 ? 'selected' : ''}`}>Rechazado</button>
                                    <button onClick={()=>setState(3)} className={`tag revision ${state === 3 ? 'selected' : ''}`}>En revisión</button>
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
                    <Window title='Reporte' onClose={()=>setIsViewReportOpen(false)}>
                        <div className='window-layout'>
                            <div className='text-holder'>
                                <h3>Titulo de Reporte</h3>
                                <p className='user-holder'>Nombre Usuario</p>
                                <div className='categories-list'>
                                    {categorias.map(categoria => {
                                        //here i need to map the categorie IDs of reporte to the actual category
                                        return (<p key={categoria.id} className='tag'>{categoria.name}</p>);
                                    })}
                                </div>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat praesentium quis ducimus itaque et molestias perspiciatis velit mollitia eos alias maiores, odio corrupti similique quaerat ea nam placeat, quasi ullam voluptatibus nostrum. Fugiat perspiciatis praesentium vel molestias amet harum fugit in eius placeat nisi qui consequuntur sunt deserunt, iure eligendi?</p>
                                <div className='liga-holder'>
                                    <h4>Liga Fraudulenta</h4>
                                    <p>http://noesseguro.com</p>
                                </div>
                                <div className='report-state'>
                                    {// i need to map the state to the correct background color here
                                        
                                    }
                                    <p className='tag aceptado'>Aceptado</p>
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
