import '../css/Window.css'

export default function Window({ title, onClose, children }) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className='modal-header'>
                    <h3>{title}</h3>
                    <button onClick={onClose}>X</button>
                </div>
                {children}
            </div>
        </div>
    );
}