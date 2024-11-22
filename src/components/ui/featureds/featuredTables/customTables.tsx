import './customTables.css';

type RowData = {
  [key: string]: string | number | boolean | JSX.Element; // Permitir JSX.Element como valor
};

interface CustomTableProps {
  columns: string[]; // Columnas de la tabla
  data: RowData[];   // Datos de la tabla
}

const CustomTable: React.FC<CustomTableProps> = ({ columns, data }) => {
  return (
    <div className="table-scroll-container"> {/* Contenedor para el scroll */}
      <table className="mi-clase-tabla">
        <thead className="mi-clase-thead">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="mi-clase-th">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody className="mi-clase-tbody">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="mi-clase-tr">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="mi-clase-td">{row[col] ?? "-"}</td> // Uso de "??" para evitar errores
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;

