//dashboard.js
import React from 'react';
import { CSVLink } from 'react-csv';
import SideBar from '../../components/SideBar';  
import PlayerTable from '../../components/PlayerTable';
import styles from './Dashboard.module.css';
import { PlayerTable1 } from '../../components/PlayerTable1';
import players from '../../components/players.json';
import PlayerModal from '../../components/PlayerModal';


const Dashboard = () => {

    const headers = [
        { label: "Name", key: "name" },
        { label: "High School", key: "highSchool" },
        { label: "GPA", key: "gpa" },
        { label: "Club Team", key: "clubTeam" },
        { label: "Position", key: "position" }
    ];

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
