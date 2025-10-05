import { useReport } from "../context/ReportContext";

export default function ViewReport({ categoryMap }) {

    const {reportInfo} = useReport();

    return (
        <div className='window-layout'>
            <div className='text-holder'>
                <h3>{reportInfo.title}</h3>
                <p className='user-holder'>{reportInfo.user}</p>
                <div className='categories-list'>
                    {reportInfo.categories.map(id => {
                        return (<p key={categoryMap[id]} className='tag'>{categoryMap[id]}</p>);
                    })}
                </div>
                <p>{reportInfo.description}</p>
                <div className='liga-holder'>
                    <h4>Liga Fraudulenta</h4>
                    <p>{reportInfo.link}</p>
                </div>
                <div className='report-state'>
                    {
                        reportInfo.status === 1 ? <p className='tag revision'>Pendiente</p> :
                        reportInfo.status === 2 ? <p className='tag aceptado'>Aprobado</p> : 
                        <p className='tag rechazado'>Aceptado</p>
                    }
                </div>
            </div>
            <div className='image-holder'>
                <img className='report-image' src={`${import.meta.env.VITE_BACKEND_URL}/${reportInfo.image}`}/>
            </div>
        </div>
    );
}