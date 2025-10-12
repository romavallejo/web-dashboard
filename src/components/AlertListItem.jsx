import icon from '/icons/alert.svg'
import '../css/AlertListItem.css'

export default function AlertListItem({ alert }) {
    return (
        <li className="alert-list-item">
            <div className='alert-icon-holder'>
                <img src={icon} alt='alert'/>
            </div>
            <p className='alert-text'>{alert}</p>
        </li>
    );
}