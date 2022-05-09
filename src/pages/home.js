import React, {useRef, useEffect, useState} from 'react';
import "../styles/home.css";
import Bin from "../images/bin.png";
import Edit from "../images/editing.png";



const Home = () => {

    const [todos, setTodos] = useState([{text: "Do the dishes", category: "house chore", key: Date.now()}]);
    const [editMode, setEditMode] = useState(false);
    const [ key, setKey ] = useState(null);

    const inputRef = useRef(null)

    const timeRef = useRef(null)

    const addTodo = () => {

        if(inputRef.current[0].value !== "" && inputRef.current[1].value !== ""){
            setTodos([{
                text: inputRef.current[0].value, 
                category: inputRef.current[1].value,
                key: Date.now()
            }, ...todos]);

            inputRef.current[0].value = "";
            inputRef.current[1].value = "";

        }
        console.log(todos)
    }

    useEffect(() => {
      
    }, [todos])

    const editTodo = () => {
        if(inputRef.current[0].value !== "" && inputRef.current[1].value !== ""){
            setTodos([
                ...todos.map((todo)=> {
                    if(todo.key === key){
                        todo.text = inputRef.current[0].value;
                        todo.category = inputRef.current[1].value;
                    }
                    return todo
                })
            ])

            inputRef.current[0].value = "";
            inputRef.current[1].value = "";

        }

        setEditMode(false);
    }

    const deleteTodo = (index, key) => {

        const filteredItems = todos.filter(item => {
            return item.key !== key
        })

        setTodos([...filteredItems])
    }

    const setDeadline = (value) => {

        if( value.target.value === new Date().toISOString().substring(11,16)){
            alert("Deadline for your task has arrived. Please complete it now.")
        }
    }

    return (
        <>
            <main>
                <div class="home-container">
                    <h1>TO-DO LIST</h1>
                    <form ref={inputRef}>
                        <div class="field">
                            <input placeholder='Add Todo here' maxLength={25} type="text"/>
                        </div>
                        <div class="field">
                            <input type="text" maxLength={25} placeholder='Add Category here'/>
                            <button type="button" onClick={()=> {
                                editMode ? editTodo() : addTodo()
                            }}>{editMode ? "Edit" : "Add"}</button>
                        </div>
                    </form>
                    <h1>YOUR TODOS:</h1>

                    <div class="todos">
                        {todos.map((todo, index) => (
                            <div class="todo-container" key={todo.key}>
                                <div class="todo-text">
                                    <p>{todo.text}</p>
                                    <em>Cat: {todo.category}</em>
                                </div>
                                <div class="overlay">
                                    <input class="deadlineInput" ref={timeRef} onChange={(val)=> {
                                        setKey(todo.key);
                                        setDeadline(val);
                                    }} type="time"/>
                                    <div onClick={()=> {
                                        setEditMode(true)
                                        setKey(todo.key)
                                    }}>
                                        <img src={Edit} alt="edit" />
                                    </div>
                                    <div onClick={()=> deleteTodo(index, todo.key)}>
                                        <img src={Bin} alt="bin" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Home;