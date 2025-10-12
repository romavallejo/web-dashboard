import '../css/Card.css'

export default function Card({ className ,title, size = [1,1], icon, children}) {
    const row = size[0];
    const column = size[1];

    return (
        <div className={`card ${className}`}
            style={{
                gridRow: `span ${row}`,
                gridColumn: `span ${column}`,
            }}
        >   
            <div className='title-holder'>
                {icon && <img src={icon} />}
                <p className='title'>{title}</p>
            </div>
            
            {children}
        </div>
    );
}