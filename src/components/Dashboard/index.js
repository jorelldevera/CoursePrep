import React from 'react';
import Sidebar from '../Sidebar';
import ClassCard from '../ClassCard';
import './Dashboard.css';
function Dashboard() {
    return(

        <div className = 'dashboard-container'>
            <div className="left-sidebar">
                <Sidebar/>
            </div>
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
            <div className = "dashboard-right">
                test right
            </div>
        </div>
    );
}

export default Dashboard;