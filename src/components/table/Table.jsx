import React from 'react';

function Table({ users = [], deleteChart }) {
    if (users.length === 0) {
        return <p>Список пуст</p>;
    }
    return (
        <>
            <table border="1">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                        <td>
                            <button onClick={() => deleteChart(user.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default Table;
