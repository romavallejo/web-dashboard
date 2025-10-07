import { useCategory } from '../context/CategoryContext';
import '../css/Pagination.css'
import '../css/PaginationCategories.css'

export default function CategoryForm({ onSubmit, submitLabel, isUploading }) {

    const {categoryInfo, setCategoryInfo, errors} = useCategory();

    return(
        <div className='window-content'>
            <h4>Nombre de Categoría</h4>
            <input 
                className='text-input' 
                placeholder='Nombre' 
                value={categoryInfo.name} 
                onChange={e => {
                    setCategoryInfo(prev => ({...prev, name: e.target.value}));
                }}
                maxLength={32}
            />

            {errors.name && <p className='error-message'>* {errors.name}</p>}

            <h4>Descripción de Categoría</h4>
            <textarea 
                className='edit-text' 
                value={categoryInfo.description} 
                onChange={e => {
                    setCategoryInfo(prev => ({...prev, description: e.target.value}));
                }}
                rows={5}
                maxLength="65535"
            />

            {errors.description && <p className='error-message'>* {errors.description}</p>}

            <div className='save-changes'>
                <button 
                    onClick={onSubmit}
                    disabled={isUploading}
                >{submitLabel}</button>

                {isUploading && <p>Creando cateogría...</p>}
                {errors.submit && <p className='error-message'>* {errors.submit}</p>}

            </div>
        </div>
    );
}