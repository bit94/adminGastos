import React from 'react';

const Reportes: React.FC = () => {
    // Datos dummy para mostrar en la tabla
    const reportes = [
        { id: 1, nombre: 'Reporte Enero', total: 1200 },
        { id: 2, nombre: 'Reporte Febrero', total: 950 },
        { id: 3, nombre: 'Reporte Marzo', total: 1100 },
    ];

    return (
        <div>
            <h1>Reportes</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {reportes.map((reporte) => (
                        <tr key={reporte.id}>
                            <td>{reporte.id}</td>
                            <td>{reporte.nombre}</td>
                            <td>${reporte.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reportes;