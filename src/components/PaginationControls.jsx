import "../css/PaginationControls.css"

export default function PaginationControls({ pagination, onPageChange }) {
    return (
        <div className='pagination-buttons'>
            {
                pagination.currentPage > 1 ? (
                    <button onClick={() => onPageChange(prev => {return {...prev, currentPage: prev.currentPage - 1}})}>
                        <img src="/icons/arrow-left-highlight.svg" alt="left arrow icon" />
                    </button>
                ) : pagination.totalPages !== 1 ?
                <div className='space-filler' /> : null
            }
            {
                pagination.currentPage < pagination.totalPages ? (
                    <button onClick={() => onPageChange(prev => {return {...prev, currentPage: prev.currentPage + 1}})}>
                        <img src="/icons/arrow-right-highlight.svg" alt="right arrow icon" />
                    </button>
                ) : pagination.totalPages !== 1 ?
                <div className='space-filler' /> : null
            }
        </div>
    );
}