import * as React from "react"
import {FC} from "react"
import {TodoType} from "../types/types"

interface TodoItemProps {
    todo: TodoType
    deleteTodo(number): void
    changeChecked(number): void
}

const TodoItem: FC<TodoItemProps> = ( {todo, deleteTodo, changeChecked} ) => {

    return (
        <div>
            <input onClick={() => changeChecked(todo.id)} type="checkbox" checked={todo.completed} readOnly/>
            {todo.id}. <span onClick={() => deleteTodo(todo.id)}>{todo.title}</span>
        </div>
    )
}

export default TodoItem