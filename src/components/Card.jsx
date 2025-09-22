import '../css/Card.css'

export default function Card({ title, size = [1,1], children}) {
    const row = size[0];
    const column = size[1];

    return (
        <div
        style={{
            gridRow: `span ${row}`,
            gridColumn: `span ${column}`,
        }}
        className="card"
        >
            <p className='title'>{title}</p>
            {children}
        </div>
    );
}