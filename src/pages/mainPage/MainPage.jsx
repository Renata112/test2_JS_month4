import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Table from "../../components/table/Table";

const URL = "http://localhost:8000/users";

function MainPage() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [users, setUsers] = useState([]);

    async function getChartData() {
        try {
            const response = await fetch(URL);
            const data = await response.json();
            setUsers(data); // Задаем данные пользователей
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    async function createChart(data) {
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (response.status === 201) {
                alert("Пользователь успешно создан");
                getChartData(); // Обновляем данные после создания пользователя
                reset(); // Сбрасываем форму
            }
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }

    async function deleteChart(id) {
        try {
            const response = await fetch(`${URL}/${id}`, {
                method: "DELETE",
            });
            if (response.status === 200) {
                alert("Пользователь удален");
                getChartData();
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }


    useEffect(() => {
        getChartData();
    }, []);

    return (
        <div>
            <h2>Создать пользователя</h2>
            <form onSubmit={handleSubmit(createChart)}>
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        {...register('username', { required: 'Username is required' })}
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                </div>
                <button type="submit">Create a user</button>
            </form>


            <Table users={users} deleteChart={deleteChart} />
        </div>
    );
}

export default MainPage;
