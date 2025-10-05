import ImageUploader from './ImageUploader';
import CategoryTag from './CategoryTag';
import '../css/Reportes.css'
import '../css/PaginationReportes.css'

export default function ReportForm({ reportInfoState, setReportInfoState, onSubmit, errorState, submitLabel, categories, categoryMap}) {
    return (
        <>
            <div className="window-layout">
                <div className="text-holder edit-report-text">
                    <h4>Título del Reporte</h4>
                    <input className='text-input' placeholder='Titulo' value={reportInfoState.title} onChange={e => setReportInfoState(prev => ({...prev, title: e.target.value}))}/>

                    {errorState.title && <p className='error-message'>* {errorState.title}</p>}

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
                        {   //
                            categories.map(category =>
                                <option key={category.id} value={category.id}>{category.name}</option>
                            )
                        }
                    </select>
                    <div className='categories-list'>
                        {   //
                            reportInfoState.categories.map(id => {
                                return <CategoryTag 
                                    key={categoryMap[id]} 
                                    categoryName={categoryMap[id]} 
                                    onDelete={() => {
                                        setReportInfoState(prev =>{
                                            return {...prev, categories: prev.categories.filter(el => el !== id)}
                                        })
                                    }}
                                />
                            })
                        }
                    </div>

                    {errorState.categories && <p className='error-message'>* {errorState.categories}</p>}

                    <h4>Descripción del reporte</h4>
                    <textarea 
                        className='edit-text' 
                        value={reportInfoState.description} 
                        onChange={e => setReportInfoState(prev => {return {...prev, description: e.target.value}})}
                        rows={5}/>

                    {errorState.description && <p className='error-message'>* {errorState.description}</p>}

                    <div className='liga-holder'>
                        <h4>Liga Fraudulenta</h4>
                        <input className='text-input' placeholder='https://ejemplo.com' value={reportInfoState.link} onChange={e => setReportInfoState(prev => {return {...prev, link: e.target.value}})}/>
                    </div>

                    {errorState.link && <p className='error-message'>* {errorState.link}</p>}

                    <div className='categories-list report-state'>
                        <button onClick={()=>setReportInfoState(prev => {return {...prev, status: 2}})} className={`tag aceptado ${reportInfoState.status === 2 ? 'selected' :''}`}>Aceptado</button>
                        <button onClick={()=>setReportInfoState(prev => {return {...prev, status: 3}})} className={`tag rechazado ${reportInfoState.status === 3 ? 'selected' : ''}`}>Rechazado</button>
                        <button onClick={()=>setReportInfoState(prev => {return {...prev, status: 1}})} className={`tag revision ${reportInfoState.status === 1 ? 'selected' : ''}`}>Pendiente</button>
                    </div>

                    {errorState.status && <p className='error-message'>* {errorState.status}</p>}

                </div>
                <div className="image-holder">
                    {reportInfoState.image && 
                        <img className='report-image' src={`${import.meta.env.VITE_BACKEND_URL}/${reportInfoState.image}`}/>
                    }
                    <h4>Seleccionar Imagen</h4>
                    <ImageUploader 
                        setImageLink={newImage => {
                            setReportInfoState(prev => (
                                {...prev, 
                                    image: newImage
                                }
                            ))
                        }}
                    />

                    {errorState.image && <p className='error-message'>* {errorState.image}</p>}
                    
                </div>
            </div>
            <div className='save-changes'>
                <button onClick={onSubmit}>{submitLabel}</button>
            </div>
        </>
    );
}