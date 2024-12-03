import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, useSortBy } from 'react-table';
import { COLUMNS } from './columns';
import PlayerModal from './PlayerModal';
import jwt_decode from 'jwt-decode';
import '../table.css';

export const PlayerTable1 = () => {
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddingPlayer, setIsAddingPlayer] = useState(false);

    const columns = useMemo(() => COLUMNS, []);

    // get players based on user id
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    console.error('No JWT token found.');
                    return;
                }
                
                // decode jwt to get username 
                const decodedToken = jwt_decode(token);
                const username = decodedToken.username;
    
                // Fetch user id by username
                const userResponse = await axios.get(`http://localhost:5000/api/v1/user/${username}`);
                const userId = userResponse.data.user_id;
    
                // Fetch players by user id
                const playerResponse = await axios.get(`http://localhost:5000/api/v1/players/${userId}`);
                
                console.log('API Response:', playerResponse.data);
    
                // Ensure the response is an array before setting state
                if (Array.isArray(playerResponse.data)) {
                    setPlayers(playerResponse.data);
                } else {
                    setPlayers([playerResponse.data]);  
                }
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };
    
        fetchPlayers();
    }, []);
    

    // Save an updated player
    const savePlayer = async (updatedPlayer) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/v1/playerupdate/${updatedPlayer.player_id}`,
                updatedPlayer
            );
            if (response.status === 200) {
                setPlayers(players.map(player =>
                    player.player_id === updatedPlayer.player_id ? updatedPlayer : player
                ));
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Error updating player:', error);
        }
    };

    // Add a new player
    const addPlayer = async (newPlayer) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/newplayerform', newPlayer);
            if (response.status === 201) {
                setPlayers((prevPlayers) => [...prevPlayers, response.data]);
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Error adding player:', error);
        }
    };

    // Delete a player
    const deletePlayer = async (playerId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/v1/playerdelete/${playerId}`); 

            if (response.status === 200) {
                setPlayers((prevPlayers) =>
                    prevPlayers.filter((player) => player.player_id !== playerId)
                );
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Error deleting player:', error);
        }
    };

    const tableInstance = useTable({ columns, data: players }, useSortBy);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

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
                    onDelete={deletePlayer} 
                />
            )}
        </>
    );
};
