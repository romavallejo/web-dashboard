import '../css/Pagination.css'
import '../css/PaginationCategories.css'

export default function CategoryForm({ categoryInfoState, setCategoryInfoState, onSubmit, submitLabel, errorState }) {
    return(
        <div className='window-content'>
            <h4>Nombre de Categoría</h4>
            <input 
                className='text-input' 
                placeholder='Nombre' 
                value={categoryInfoState.name} 
                onChange={e => {
                    setCategoryInfoState(prev => ({...prev, name: e.target.value}));
                }}
                maxLength={32}
            />

            {errorState.name && <p className='error-message'>* {errorState.name}</p>}
            {errorState.repeatedName && <p className='error-message'>* {errorState.repeatedName}</p>}

            <h4>Descripción de Categoría</h4>
            <textarea 
                className='edit-text' 
                value={categoryInfoState.description} 
                onChange={e => {
                    setCategoryInfoState(prev => ({...prev, description: e.target.value}));
                }}
                rows={5}
                maxLength="2"
            />

            {errorState.description && <p className='error-message'>* {errorState.description}</p>}

            <div className='save-changes'>
                <button onClick={onSubmit}>{submitLabel}</button>
            </div>
        </div>
    );
}