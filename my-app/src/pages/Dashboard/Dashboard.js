// src/pages/Dashboard/Dashboard.js

import React from 'react';
import navigation from '../../components/navigation';  
import { PlayerTable1 } from '../../components/PlayerTable1.js';


const Dashboard = () => {
    return (
        <div>
            <navigation />
            <h1>Dashboard</h1>
            <PlayerTable1 />
        </div>
    );
};

export default Dashboard;
