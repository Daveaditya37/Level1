import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './App.css'; // Import the CSS file for styling

const Summary = () => {
    const location = useLocation();
    const formData = location.state && location.state.formData;

    if (!formData) {
        // Handle case where formData is not available
        return <div>No data available</div>;
    }

    const { name, email, age, isAttendingWithGuest, guestName } = formData;

    return (
        <div className="summary-container">
            <h2 className="summary-title">Registration Summary</h2>
            <div className="summary-content">
                <p><span className="summary-label">Name:</span><span className="summary-value">{name}</span></p>
                <p><span className="summary-label">Email:</span><span className="summary-value">{email}</span></p>
                <p><span className="summary-label">Age:</span><span className="summary-value">{age}</span></p>
                <p><span className="summary-label">Attending with Guest:</span><span className="summary-value">{isAttendingWithGuest ? 'Yes' : 'No'}</span></p>
                {isAttendingWithGuest && <p><span className="summary-label">Guest Name:</span><span className="summary-value">{guestName}</span></p>}
            </div>
            <Link to="/" className="summary-button">Back to Form</Link>
        </div>
    );
};

export default Summary;

