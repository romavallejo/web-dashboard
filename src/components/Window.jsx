import '../css/Window.css'

export default function Window({ title, onClose, disableButton, children }) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className='modal-header'>
                    <p className='window-descriptor'>{title}</p>
                    <button onClick={onClose}
                        disabled={disableButton}
                    >X</button>
                </div>
                {children}
            </div>
        </div>
    );
}