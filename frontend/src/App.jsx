import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserList from './components/UserList';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/users" component={UserList} />
            </Switch>
        </Router>
    );
}

export default App;
