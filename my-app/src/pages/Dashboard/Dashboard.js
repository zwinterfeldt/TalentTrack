//dashboard.js
import React from 'react';
import SideBar from '../../components/SideBar';  
import PlayerTable from '../../components/PlayerTable';
import styles from './Dashboard.module.css';
import { PlayerTable1 } from '../../components/PlayerTable1';

const Dashboard = () => {
    return (
        <div className={styles.dashboardContainer}> 
            <div className={styles.sideBar}>
                <SideBar /> 
            </div>
            <div className={styles.mainContent}>
                <h1>Dashboard</h1>
                <PlayerTable1 /> 
            </div>
        </div>
    );
};

export default Dashboard;

