import React, { useMemo, useState, useEffect } from 'react';
import { CSVLink } from "react-csv";
import { useTable, useSortBy } from 'react-table';
// import players from './players.json';
import { COLUMNS } from './columns';
import '../table.css';
import axios from 'axios';

export const PlayerTable1 = () => {
    const [players, setPlayers] = useState([]);
    const [expandedRowIndex, setExpandedRowIndex] = useState(null);

    const columns = useMemo(() => COLUMNS, []);

    // Fetch players data from the backend
    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/players')
            .then(response => setPlayers(response.data))
            .catch(error => console.error('Failed to fetch players:', error));
    }, []);

    const tableInstance = useTable({
        columns,
        data: players
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
                                            <p>Name: {row.original.first_name}</p>
                                            <p>High School: {row.original.high_school}</p>
                                            <p>GPA: {row.original.gpa}</p>
                                            <p>Club Team: {row.original.clubTeam}</p>
                                            <p>Position: {row.original.player_position}</p>
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
