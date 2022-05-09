/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import "../styles/admin.css";



const Admin = () => {

    const [todos, setTodos] = useState([
        {text: "Do the dishes", 
        category: "kitchen", key: Date.now()},
        {text: "Wash the car", 
        category: "chore", key: Date.now()},
        {text: "Do homework", 
        category: "school", key: Date.now()}
    ]);
    

    return (
        <>
            <main>
                <div class="container">
                    <h1>TO-DO DASHBOARD</h1>

                    <div class="cards">
                        <div class="card">
                            <p>Todos Created</p>
                            <p>{todos.length}</p>
                        </div>
                        <div class="card">
                            <p>Todos Edited</p>
                            <p>5</p>
                        </div>
                        <div class="card">
                            <p>Todos Deleted</p>
                            <p>13</p>
                        </div>
                    </div>
                    
                    <h1>TODOS CREATED:</h1>

                    <div class="todos">
                        {todos.map((todo, index) => (
                            <div class="todo" key={todo.key}>
                                <p>{todo.text}</p>
                                <em>Cat: {todo.category}</em>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Admin;