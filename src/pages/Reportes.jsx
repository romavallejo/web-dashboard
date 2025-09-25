import Card from '../components/Card.jsx'
import Window from '../components/Window.jsx'
import PaginationReportes from '../components/PaginationReportes.jsx'
import SearchBar from '../components/SearchBar.jsx'
import { useState } from 'react'
import '../css/pageBase.css'
import '../css/Reportes.css'

export default function Reportes(){

    const [isCreateReportOpen,setIsCreateReportOpen] = useState(false);
    const [searchFilter,setSearchFilter] = useState("");

    const handleSearch = text => { //later get rid of this and use setSearchFilter direclty bellow
        setSearchFilter(text);
        console.log(text);
    }

    const paginationRows = [
        {id:'1',usuario:'pepe23',categoria:'Ropa',estado:'En Revisión',fechaCreacion:'27/03/2028'},
        {id:'2',usuario:'juan',categoria:'Comida',estado:'Aceptado',fechaCreacion:'15/11/2026'},
        {id:'3',usuario:'noel',categoria:'Coches',estado:'Rechazado',fechaCreacion:'15/11/2026'},
    ]
    //const paginationInfoj = await something();

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
                    <Card title='Aceptado'>
                        <p className="number aceptado">8</p>
                    </Card>
                    <Card title='Rechazados'>
                        <p className="number rechazado">19</p>
                    </Card>
                    <Card title='En Revisión'>
                        <p className="number revision">0</p>
                    </Card>
                    <Card title='Lista de Reportes' size={[1,4]}>
                        <div className='search-bar'>
                            <SearchBar onSearch={handleSearch} />
                            <select className='toggle-select'>
                                <option value='0'>Todos los Estados</option>
                                <option value='1'>Aceptados</option>
                                <option value='2'>Pendientes</option>
                                <option value='3'>Rechazados</option>
                            </select>
                            <select className='toggle-select'>
                                <option value='0'>Todas las Categorias</option>
                                <option value='1'>Perros</option>
                                <option value='2'>Amigos</option>
                                <option value='3'>Coches</option>
                            </select>
                        </div>
                        <PaginationReportes rows={paginationRows} />
                        pages options here
                    </Card>
                </div>
            </div>
            {isCreateReportOpen &&
                <Window title="Crear Reporte" onClose={()=>setIsCreateReportOpen(false)}>
                    
                </Window>
            }
        </div>
    );

};