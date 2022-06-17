import * as React from "react"
import {useState} from "react"
import {useApolloClient, useQuery} from "@apollo/client"
import {FETCH_TODOS} from '../query/todo.ts'
import {TodoType} from "../types/types"

const AddTodo = () => {
    const apolloClient = useApolloClient()
    const { data } = useQuery<{ todos: TodoType[] }>(FETCH_TODOS)
    const [todoText, setTodoText] = useState('')

    const addTodo = () => {
        if(todoText) {
            const newTodo = {
                __typename: 'Todo',
                id: Date.now(),
                title: todoText,
                completed: false
            }

            apolloClient.writeQuery({
                query: FETCH_TODOS,
                data: {
                    todos: [...data.todos, newTodo],
                },
            })

            setTodoText('')
        }
    }

    return (
        <div>
            <input type="text" value={todoText} onChange={event => setTodoText(event.target.value)}/>
            <button onClick={addTodo}>Add todo</button>
        </div>
    )
}

export default AddTodo
