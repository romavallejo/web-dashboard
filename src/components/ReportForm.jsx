import ImageUploader from './ImageUploader';
import CategoryTag from './CategoryTag';
import '../css/Reportes.css'
import '../css/PaginationReportes.css'

export default function ReportForm({ reportInfoState, setReportInfoState, onSubmit, errorState, submitLabel, categories}) {
    return (
        <>
            <div className="window-layout">
                <div className="text-holder edit-report-text">
                    <h4>Título del Reporte</h4>
                    <input className='text-input' placeholder='Titulo' value={reportInfoState.title} onChange={e => setReportInfoState(prev => ({...prev, title: e.target.value}))}/>
                    <p className='user-holder'>{reportInfoState.user}</p>
                    <h4>Categorías</h4>
                    <select className='toggle-select' onChange={e => {
                        setReportInfoState(prev => {
                            if (e.target.value == 0)
                                return {...prev}
                            if (!prev.categories.includes(e.target.value))
                                return {...prev, categories: [...prev.categories, e.target.value]}
                            return {...prev}
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
                        {
                            reportInfoState.categories.map(id => {
                                return <CategoryTag 
                                    key={id} 
                                    categoryName={categories[id-1].name} 
                                    onDelete={() => {
                                        setReportInfoState(prev =>{
                                            return {...prev, categories: prev.categories.filter(el => el !== id)}
                                        })
                                    }}
                                />
                            })
                        }
                    </div>
                    <h4>Descripción del reporte</h4>
                    <textarea 
                        className='edit-text' 
                        value={reportInfoState.description} 
                        onChange={e => setReportInfoState(prev => {return {...prev, description: e.target.value}})}
                        rows={5}/>
                    <div className='liga-holder'>
                        <h4>Liga Fraudulenta</h4>
                        <input className='text-input' placeholder='https://ejemplo.com' value={reportInfoState.link} onChange={e => setReportInfoState(prev => {return {...prev, link: e.target.value}})}/>
                    </div>
                    <div className='categories-list report-state'>
                        <button onClick={()=>setReportInfoState(prev => {return {...prev, status: 2}})} className={`tag aceptado ${reportInfoState.status === 2 ? 'selected' :''}`}>Aceptado</button>
                        <button onClick={()=>setReportInfoState(prev => {return {...prev, status: 3}})} className={`tag rechazado ${reportInfoState.status === 3 ? 'selected' : ''}`}>Rechazado</button>
                        <button onClick={()=>setReportInfoState(prev => {return {...prev, status: 1}})} className={`tag revision ${reportInfoState.status === 1 ? 'selected' : ''}`}>Pendiente</button>
                    </div>
                </div>
                <div className="image-holder">
                    {reportInfoState.image && 
                        <img className='report-image' src={reportInfoState.image}/>
                    }
                    <h4>Seleccionar Imagen</h4>
                    <ImageUploader 
                        setImageLink={newImage => {
                            setReportInfoState(prev => ({...prev, image: "http://18.221.59.69/"+newImage}))
                        }}
                    />
                </div>
            </div>
            <div className='save-changes'>
                <button onClick={onSubmit}>{submitLabel}</button>
            </div>
        </>
    );
}