import React, { useMemo, useState } from 'react';
import { CSVLink } from "react-csv";
import { useTable, useSortBy } from 'react-table';
import players from './players.json';
import { COLUMNS } from './columns';
import '../table.css';

export const PlayerTable1 = () => {
    const [expandedRowIndex, setExpandedRowIndex] = useState(null);

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => players, []);

    const tableInstance = useTable({
        columns,
        data
    }, useSortBy);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = tableInstance;

    // Toggle the expanded row
    const toggleRowExpansion = (rowIndex) => {
        setExpandedRowIndex(expandedRowIndex === rowIndex ? null : rowIndex);
    };

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, rowIndex) => {
                    prepareRow(row);
                    return (
                        <React.Fragment key={rowIndex}>
                            {/* Main row */}
                            <tr 
                                {...row.getRowProps()} 
                                onClick={() => toggleRowExpansion(rowIndex)} 
                                style={{ cursor: 'pointer' }}
                            >
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                            </tr>

                            {/* Expanded row details */}
                            {expandedRowIndex === rowIndex && (
                                <tr>
                                    <td colSpan={columns.length}>
                                        <div style={{ padding: '10px', background: '#f9f9f9' }}>
                                            {/* Render additional player details here */}
                                            <strong>More Details:</strong>
                                            <p>Name: {row.original.name}</p>
                                            <p>High School: {row.original.highSchool}</p>
                                            <p>GPA: {row.original.gpa}</p>
                                            <p>Club Team: {row.original.clubTeam}</p>
                                            <p>Position: {row.original.position}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    );
                })}
            </tbody>
        </table>
    );
};
