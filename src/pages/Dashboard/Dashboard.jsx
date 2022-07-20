import React from 'react';
import './style.css';
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    setTimeout(() => {
        if (!localStorage.getItem("user-info")) {
            navigate("/login");
        }
    }, 500);
    return (
        <div>Dashboard</div>
    )
}

export default Dashboard