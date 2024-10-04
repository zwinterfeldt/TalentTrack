// src/pages/Dashboard/Dashboard.js

import React from 'react';
import navigation from '../../components/navigation';  
import PlayerTable from '../../components/PlayerTable';


const Dashboard = () => {
    return (
        <div>
            <navigation />
            <h1>Dashboard</h1>
            <PlayerTable />
        </div>
    );
};

export default Dashboard;
