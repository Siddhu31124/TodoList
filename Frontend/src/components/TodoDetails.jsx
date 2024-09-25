import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todoAction } from '../store/ReduxStore';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
    const navigate=useNavigate()
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(todoAction.onDeleteTodo(id));
        if(todos.length===1){
            navigate('/')
        }
        
    };

    return (
        <div className="todo-list">
            <h1>Todo List</h1>
            {todos.length === 0 ? (
                <p>No todos available</p>
            ) : (
                <>
                <ul>
                    {todos.map(todo => (
                        <li key={todo.id} className="todo-item">
                            <div className='todo-item1'>
                                <p className='heading'><h2>{todo.title}</h2><h4>{todo.date}</h4></p>
                                <p>{todo.description}</p>
                                
                            </div>
                            <button onClick={() => handleDelete(todo.id)} className="delete-button">
                                <FaTrash />
                            </button>
                        </li>
                    ))}
                </ul>
                </>
            )}
        </div>
    );
};

export default TodoList;