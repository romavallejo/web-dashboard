import Button from './Button';
import '../css/Window.css'

export default function Window({ title, onClose, disableButton, children }) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className='modal-header'>
                    <p className='window-descriptor'>{title}</p>
                    <Button onClick={onClose} disable={disableButton} icon='/icons/x.svg' />
                </div>
                {children}
            </div>
        </div>
    );
}