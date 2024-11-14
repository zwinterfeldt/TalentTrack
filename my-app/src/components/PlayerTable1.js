import React, { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import playersData from './players.json';
import { COLUMNS } from './columns';
import PlayerModal from './PlayerModal';
import '../table.css';

export const PlayerTable1 = () => {
    const [players, setPlayers] = useState(playersData);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddingPlayer, setIsAddingPlayer] = useState(false); 

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => players, [players]);

    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useSortBy
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    // Save player details
    const savePlayer = (updatedPlayer) => {
        const updatedPlayers = players.map((player) =>
            player.id === updatedPlayer.id ? updatedPlayer : player
        );
        setPlayers(updatedPlayers);
        setIsModalOpen(false);
    };

    // Add new player
    const addPlayer = (newPlayer) => {
        setPlayers([...players, { ...newPlayer, id: players.length + 1 }]);
        setIsModalOpen(false);
    };

    return (
        <>
            {/* Add Player Button */}
            <div style={{ marginBottom: '20px' }}>
                <button
                    style={{
                        padding: '10px 15px',
                        backgroundColor: '#6A5ACD', 
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        setIsAddingPlayer(true);
                        setSelectedPlayer(null);
                        setIsModalOpen(true);
                    }}
                >
                    Add Player
                </button>
            </div>

            {/* Player Table */}
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
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                onClick={() => {
                                    setSelectedPlayer(row.original);
                                    setIsAddingPlayer(false);
                                    setIsModalOpen(true);
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Player Modal */}
            {isModalOpen && (
                <PlayerModal
                    player={selectedPlayer}
                    isAddingPlayer={isAddingPlayer}
                    onClose={() => setIsModalOpen(false)}
                    onSave={savePlayer}
                    onAdd={addPlayer}
                />
            )}
        </>
    );
};