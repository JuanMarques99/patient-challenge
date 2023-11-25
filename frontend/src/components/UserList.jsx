import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/patients')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the patients', error);
            });
    }, []);

    return (
        <div>
            {users.map(user => (
                <div key={user.id}>{user.name}</div>
            ))}
        </div>
    );
}

export default UserList;
