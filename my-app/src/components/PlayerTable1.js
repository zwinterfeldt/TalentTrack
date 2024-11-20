import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, useSortBy } from 'react-table';
import { COLUMNS } from './columns';
import PlayerModal from './PlayerModal';
import '../table.css';

export const PlayerTable1 = () => {
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddingPlayer, setIsAddingPlayer] = useState(false);

    const columns = useMemo(() => COLUMNS, []);

    // Fetch players data from the backend
    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/players')
            .then(response => setPlayers(response.data))
            .catch(error => console.error('Failed to fetch players:', error));
    }, []);

    const savePlayer = async (updatedPlayer) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/v1/playerupdate/${updatedPlayer.player_id}`, updatedPlayer);
            if (response.status === 200) {
                setPlayers(players.map(player =>
                    player.player_id === updatedPlayer.player_id ? updatedPlayer : player
                ));
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error("Error updating player:", error);
        }
    };

    const addPlayer = async (newPlayer) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/newplayerform', newPlayer);
            if (response.status === 201) {
                setPlayers([...players, response.data]);
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error("Error adding player:", error);
        }
    };

    const tableInstance = useTable({ columns, data: players }, useSortBy);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    return (
        <>
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

            {isModalOpen && (
                <PlayerModal
                    player={selectedPlayer}
                    isAddingPlayer={isAddingPlayer}
                    onClose={() => setIsModalOpen(false)}
                    onSave={savePlayer}
                    onAdd={addPlayer} // Pass the addPlayer function here
                />
            )}
        </>
    );
};
