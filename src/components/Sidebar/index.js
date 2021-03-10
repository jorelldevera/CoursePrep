import React from 'react';
import './Sidebar.css';
import ClassCard from '../ClassCard';
function Sidebar(){

    return(
        <div id="sideBar" className="sidebar">
            <div className = "sidebar-container">
                <div className = "sidebar-title">
                    <h1 className = "h1-white">Menu</h1>
                </div>
                <div className = "classes-list">
                    <ClassCard/>
                    <ClassCard/>
                    <ClassCard/>
                    <ClassCard/>
                    <ClassCard/>
                    <ClassCard/>
                    <ClassCard/>
                    <ClassCard/>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;