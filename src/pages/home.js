/* eslint-disable array-callback-return */
import React, {useRef, useState} from 'react';
import "../styles/home.css";
import Bin from "../images/bin.png";
import Edit from "../images/editing.png";



const Home = () => {

    const [todos, setTodos] = useState([{text: "Do the dishes", category: "house chore", key: Date.now(), comments: [{text: "Remember to do this", key: Date.now()}]}]);
    const [editMode, setEditMode] = useState(false);

    const [editCommentMode, setEditCommentMode] = useState(false);

    const [ key, setKey ] = useState(null);

    const [ commentKey, setCommentKey ] = useState(null);

    const inputRef = useRef(null)

    const timeRef = useRef(null)

    const commentRef = useRef(null)
 
    const [showComments, setShowComments] = useState(false);

    const addTodo = () => {

        if(inputRef.current[0].value !== "" && inputRef.current[1].value !== ""){
            setTodos([{
                text: inputRef.current[0].value, 
                category: inputRef.current[1].value,
                key: Date.now(),
                comments: []
            }, ...todos]);

            inputRef.current[0].value = "";
            inputRef.current[1].value = "";

        }
        console.log(todos)
    }

    const addComments = () => {
        if(commentRef.current.value !== ""){
            setTodos([
                ...todos.map((todo)=> {
                    if(todo.key === commentKey){
                        todo.comments.push({text: commentRef.current.value, key: Date.now()});
                    }
                    return todo;
                })
            ])

            commentRef.current.value = "";
            setShowComments(false);
        }
    }

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

    const editComments = () => {
        if(commentRef.current.value !== ""){
            setTodos([
                ...todos.map((todo)=> {
                    todo.comments.map((comment)=> {
                        if(comment.key === commentKey){
                            comment.text = commentRef.current.value;
                        }
                    });
                    return todo;
                })
            ])

            commentRef.current.value = "";
            setEditCommentMode(false)
        }
    }

    const deleteTodo = (index, key) => {

        const filteredItems = todos.filter(item => {
            return item.key !== key
        })

        console.log(filteredItems)

        setTodos([...filteredItems])
    }

    const deleteComment = (index, key, commentKey, commentIndex) => {
       todos.map(todo => {
            if(todo.key === key){
                todo.comments.splice(commentIndex,1)
                setTodos([...todos])
            }
        })
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
                            <>
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
                                        <p onClick={()=> {
                                            setCommentKey(todo.key)
                                            setShowComments(todo.key)
                                        }}>View<br/> Comments</p>
                                    </div>
                                </div>
                                {showComments === todo.key ? <div class="comments">
                                    <ul>
                                        {todo.comments.map((comment, commentIndex) => (
                                            <li>{comment.text} 
                                                <div class="editContainer">
                                                    <div onClick={()=> {
                                                        setEditCommentMode(true)
                                                        setCommentKey(comment.key)
                                                    }}>
                                                        <img src={Edit} alt="edit" />
                                                    </div>
                                                    <div onClick={()=> deleteComment(index, todo.key, comment.key, commentIndex)}>
                                                        <img src={Bin} alt="bin" />
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <form class="add-comments">
                                        <input placeholder='Add Comment' ref={commentRef}/>
                                        <button type='button' onClick={()=> {
                                            editCommentMode ? editComments() : addComments()
                                        }}>{editCommentMode ? "Edit" : "Add"}</button>
                                    </form>
                                </div> : null}
                            </>
                            
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Home;