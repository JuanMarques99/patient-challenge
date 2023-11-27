import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/users" element={<UserList />} />
            </Routes>
        </Router>
    );
}

export default App;
