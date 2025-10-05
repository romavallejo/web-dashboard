
export default function ViewReport({ reportInfoState, categoryMap}) {
    return (
        <div className='window-layout'>
            <div className='text-holder'>
                <h3>{reportInfoState.title}</h3>
                <p className='user-holder'>{reportInfoState.user}</p>
                <div className='categories-list'>
                    {reportInfoState.categories.map(id => {
                        return (<p key={categoryMap[id]} className='tag'>{categoryMap[id]}</p>);
                    })}
                </div>
                <p>{reportInfoState.description}</p>
                <div className='liga-holder'>
                    <h4>Liga Fraudulenta</h4>
                    <p>{reportInfoState.link}</p>
                </div>
                <div className='report-state'>
                    {
                        reportInfoState.status === 1 ? <p className='tag revision'>Pendiente</p> :
                        reportInfoState.status === 2 ? <p className='tag aceptado'>Aprobado</p> : 
                        <p className='tag rechazado'>Aceptado</p>
                    }
                </div>
            </div>
            <div className='image-holder'>
                <img className='report-image' src={`${import.meta.env.VITE_BACKEND_URL}/${reportInfoState.image}`}/>
            </div>
        </div>
    );
}