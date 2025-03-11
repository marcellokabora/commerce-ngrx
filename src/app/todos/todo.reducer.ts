import { createReducer, on } from '@ngrx/store';
import { Todo } from './todo.model';
import { addTodo, toggleTodo, removeTodo, loadTodosSuccess } from './todo.actions';

export const initialState: Todo[] = [];

export const todoReducer = createReducer(
    initialState,
    on(addTodo, (state, { text }) => {
        const newTodo: Todo = {
            id: state.length + 1,
            text,
            completed: false,
        };
        const todos = [...state, newTodo]
        localStorage.setItem("todos", JSON.stringify(todos));
        return todos;
    }),
    on(toggleTodo, (state, { id }) => {
        const todos = state.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
        localStorage.setItem("todos", JSON.stringify(todos));
        return todos
    }
    ),
    on(removeTodo, (state, { id }) => {
        const todos = state.filter((todo) => todo.id !== id)
        localStorage.setItem("todos", JSON.stringify(todos));
        return todos
    }),
    // on(loadTodosSuccess, (state, { todos }) => todos)
);
