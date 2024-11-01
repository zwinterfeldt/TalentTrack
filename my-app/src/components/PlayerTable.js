// src/components/PlayerTable.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerTable = () => {
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/players')
            .then(response => setPlayers(response.data))
            .catch(error => console.error('Failed to fetch players:', error));
    }, []);

    const handlePlayerClick = player => {
        setSelectedPlayer(player);
    };

    return (
        <div>
            <h2>Players Overview</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Rating</th>
                        <th>Position</th>
                        <th>Grad Year</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map(player => (
                        <tr key={player.id}>
                            <td><button onClick={() => handlePlayerClick(player)}>{player.name}</button></td>
                            <td>{player.rating}</td>
                            <td>{player.position}</td>
                            <td>{player.grad_year}</td>
                            <td>{player.state}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedPlayer && (
                <div>
                    <h4>Details for {selectedPlayer.name}</h4>
                    <p>GPA: {selectedPlayer.gpa}</p>
                    <p>Last Game: {selectedPlayer.last_game}</p>
                    <p>Other Info: {selectedPlayer.other_info}</p>
                </div>
            )}
        </div>
    );
};

export default PlayerTable;
