import ImageUploader from './ImageUploader';
import CategoryTag from './CategoryTag';
import { useReport } from '../context/ReportContext';
import { deleteImage } from '../api/imageServices';
import '../css/Reportes.css'
import '../css/PaginationReportes.css'

export default function ReportForm({ onSubmit, submitLabel, categories, categoryMap, isUploading}) {
    
    const { reportInfo, setReportInfo, errors } = useReport();

    async function onUploadImage(newImage) {
        // CASE 1: New report, no start image
        if (!reportInfo.startImage) {
            if (reportInfo.image) // If an unsaved temp image already exists, delete it first
                await deleteImage(reportInfo.image);

            setReportInfo(prev=>({
                ...prev,
                image: newImage
            }));
            return;
        } 
        // CASE 2: Editing existing report with a start image
        // First time user uploads a new image → save the original as savedImage
        if (reportInfo.startImage === reportInfo.image) {
            setReportInfo(prev=>({
                ...prev,
                image: newImage
            }));
            return;
        }   
        // If user uploads again (already replaced before)
        if (reportInfo.image)
            await deleteImage(reportInfo.image)
        
        setReportInfo(prev=>({
            ...prev,
            image: newImage
        }));
    }
    
    return (
        <>
            <div className="window-layout">
                <div className="text-holder edit-report-text">
                    <h4>Título del Reporte</h4>
                    <input className='text-input'
                        placeholder='Titulo' 
                        value={reportInfo.title} 
                        onChange={e => setReportInfo(prev => ({...prev, title: e.target.value}))}
                        maxLength="100"
                        />

                    {errors.title && <p className='error-message'>* {errors.title}</p>}

                    <p className='user-holder'>{reportInfo.user}</p>
                    <h4>Categorías</h4>
                    <select className='toggle-select' onChange={e => {
                        setReportInfo(prev => {
                            if (Number(e.target.value) == 0)
                                return {...prev}
                            if (!prev.categories.includes(Number(e.target.value)))
                                return {...prev, categories: [...prev.categories, Number(e.target.value)]}
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
                            reportInfo.categories.map(id => {
                                return <CategoryTag 
                                    key={categoryMap[id]} 
                                    categoryName={categoryMap[id]} 
                                    onDelete={() => {
                                        setReportInfo(prev =>{
                                            return {...prev, categories: prev.categories.filter(el => el !== id)}
                                        })
                                    }}
                                />
                            })
                        }
                    </div>

                    {errors.categories && <p className='error-message'>* {errors.categories}</p>}

                    <h4>Descripción del reporte</h4>
                    <textarea 
                        className='edit-text' 
                        value={reportInfo.description} 
                        onChange={e => setReportInfo(prev => {return {...prev, description: e.target.value}})}
                        rows={5}
                        maxLength="4294967295"
                    />

                    {errors.description && <p className='error-message'>* {errors.description}</p>}

                    <div className='liga-holder'>
                        <h4>Liga Fraudulenta</h4>
                        <input className='text-input' 
                            placeholder='https://ejemplo.com' 
                            value={reportInfo.link} 
                            onChange={e => setReportInfo(prev => {return {...prev, link: e.target.value}})}
                            maxLength="100"
                        />
                    </div>

                    {errors.link && <p className='error-message'>* {errors.link}</p>}

                    <div className='categories-list report-state'>
                        <button onClick={()=>setReportInfo(prev => {return {...prev, status_id: 2}})} className={`tag aceptado ${reportInfo.status_id === 2 ? 'selected' :''}`}>Aceptado</button>
                        <button onClick={()=>setReportInfo(prev => {return {...prev, status_id: 3}})} className={`tag rechazado ${reportInfo.status_id === 3 ? 'selected' : ''}`}>Rechazado</button>
                        <button onClick={()=>setReportInfo(prev => {return {...prev, status_id: 1}})} className={`tag revision ${reportInfo.status_id === 1 ? 'selected' : ''}`}>Pendiente</button>
                    </div>

                    {errors.status_id && <p className='error-message'>* {errors.status_id}</p>}

                </div>
                <div className="image-holder">
                    {reportInfo.image && 
                        <img className='report-image' src={`${import.meta.env.VITE_BACKEND_URL}/${reportInfo.image}`}/>
                    }
                    <h4>Seleccionar Imagen</h4>
                    <ImageUploader 
                        setImageLink={onUploadImage}
                    />

                    {errors.image && <p className='error-message'>* {errors.image}</p>}
                    
                </div>
            </div>
            <div className='save-changes'>
                <button 
                    onClick={onSubmit}
                    disabled={isUploading}
                >{submitLabel}</button>
                {errors.submit && <p className='error-message'>* {errors.submit}</p>}

            </div>
        </>
    );
}