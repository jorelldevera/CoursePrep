import React from 'react';
import Sidebar from '../Sidebar';
import RightMenu from '../RightMenu';
import ClassCard from '../ClassCard';
import './Dashboard.css';
function Dashboard() {
    return(

        <div className = 'dashboard-container'>
            <Sidebar/>
            <div className = "dashboard-center">
                <div className = "dashboard-title">
                    <h1>Courses</h1>
                </div>
                <div className = "classes-container">
                    <div className = "classes-grid">
                        <ClassCard/>
                        <ClassCard/>
                        <ClassCard/>
                        <ClassCard/>
                    </div>
                </div>
            </div>
            <RightMenu/>
        </div>
    );
}

export default Dashboard;