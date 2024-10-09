//dashboard.js
import React from 'react';
import SideBar from '../../components/SideBar';  
import PlayerTable from '../../components/PlayerTable';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    return (
        <div className={styles.dashboardContainer}> 
            <div className={styles.sideBar}>
                <SideBar /> 
            </div>
            <div className={styles.mainContent}>
                <h1>Dashboard</h1>
                <PlayerTable /> 
            </div>
        </div>
    );
};

export default Dashboard;

