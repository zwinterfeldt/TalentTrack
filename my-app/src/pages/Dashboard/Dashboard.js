//dashboard.js
import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import SideBar from '../../components/SideBar';  
import PlayerTable from '../../components/PlayerTable';
import styles from './Dashboard.module.css';
import { PlayerTable1 } from '../../components/PlayerTable1';
import players from '../../components/players.json';
import PlayerModal from '../../components/PlayerModal';


const Dashboard = () => {

    const [players, setPlayers] = useState([]);

    return (
        <div className={styles.dashboardContainer}> 
            <div className={styles.sideBar}>
                <SideBar players={players} /> 
            </div>
            <div className={styles.mainContent}>
                <h1>Dashboard</h1>
                <PlayerTable1 onPlayersUpdate={setPlayers} /> 
            </div>
        </div>
    );
};

export default Dashboard;
