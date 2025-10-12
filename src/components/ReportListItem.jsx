import icon from '/icons/thumb-up-small.svg'
import '../css/ReportListItem.css'

export default function ReportListItem({ id, title, upvotes}) {
    return (
        <li className="report-list-item">
            <div className="report-id">
                <p className='id-text'>ID {id}</p>
            </div>
            <p className='title-text'>{title}</p>
            <div className="report-upvotes">
                <img src={icon} alt='thumb up' />
                <p className='upvote-text'>{upvotes}</p>
            </div>
        </li>
    );
}