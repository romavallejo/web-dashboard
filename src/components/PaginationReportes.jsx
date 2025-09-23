import '../css/Pagination.css'

export default function PaginationReportes({ columns, rows }) {

    const estadoClass = {
        'Aceptado': 'estado-aceptado',
        'En Revisión': 'estado-revision',
        'Rechazado': 'estado-rechazado'
    };

    return (
        <table>
            <thead>
                <tr>
                    {columns.map(col => (
                        <th key={col}>{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows && rows.map(row => (
                    <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.usuario}</td>
                        <td>
                            <div className='tag categoria'>
                                {row.categoria} 
                            </div>
                        </td>
                        <td>
                            <div className={`tag ${estadoClass[row.estado] || ''}`}>
                                {row.estado}
                            </div>
                        </td>
                        <td>{row.fechaCreacion}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
