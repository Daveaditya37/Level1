import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './EventRegistrationForm';
import Summary from './summary';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Form />} />
                <Route path="/summary" element={<Summary />} />
            </Routes>
        </Router>
    );
};

export default App;

