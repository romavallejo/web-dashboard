import '../css/CategoryTag.css'

export default function CategoryTag({ categoryName, onDelete }) {
    return (
        <div className='edit-tag tag'>
            <p>{categoryName}</p>
            <button onClick={onDelete}>X</button>
        </div>
    );
}