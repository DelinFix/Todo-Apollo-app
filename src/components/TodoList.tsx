import * as React from "react"
import {useApolloClient, useQuery} from '@apollo/client'
import TodoItem from "./TodoItem.tsx"
import {FC, useEffect} from "react"
import {TodoType} from "../types/types"
import {COMPLETED, FETCH_TODOS} from '../query/todo.ts'

const todosBack: TodoType[] = [
    {
        "__typename": 'Todo',
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
    },
    {
        "__typename": 'Todo',
        "id": 2,
        "title": "quis ut nam facilis et officia qui",
        "completed": false
    },
    {
        "__typename": 'Todo',
        "id": 3,
        "title": "fugiat veniam minus",
        "completed": false
    },
    {
        "__typename": 'Todo',
        "id": 4,
        "title": "et porro tempora",
        "completed": true
    },
    {
        "__typename": 'Todo',
        "id": 5,
        "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
        "completed": false
    },
    {
        "__typename": 'Todo',
        "id": 6,
        "title": "qui ullam ratione quibusdam voluptatem quia omnis",
        "completed": false
    },
    {
        "__typename": 'Todo',
        "id": 7,
        "title": "illo expedita consequatur quia in",
        "completed": false
    },
    {
        "__typename": 'Todo',
        "id": 8,
        "title": "quo adipisci enim quam ut ab",
        "completed": true
    },
    {
        "__typename": 'Todo',
        "id": 9,
        "title": "molestiae perspiciatis ipsa",
        "completed": false
    },
    {
        "__typename": 'Todo',
        "id": 10,
        "title": "illo est ratione doloremque quia maiores aut",
        "completed": true
    }
]

const TodoList: FC = () => {
    const apolloClient = useApolloClient()
    const { data } = useQuery<{ todos: TodoType[] }>(FETCH_TODOS)
    const todos = data ? data.todos : []

    useEffect(() => {
        apolloClient.writeQuery({query: FETCH_TODOS, data: {todos: todosBack}})
    }, [])

    const deleteTodo = (id) => {
        apolloClient.writeQuery({
            query: FETCH_TODOS,
            data: {
                todos: [...data.todos.filter(item => item.id !== id)],
            },
        })
    }

    const changeChecked = (id) => {
        const status = apolloClient.readFragment({
            id: `Todo:${id}`,
            fragment: COMPLETED
        })

        apolloClient.writeFragment({
            id: `Todo:${id}`,
            fragment: COMPLETED,
            data: {
                completed: !status.completed
            }
        })
    }

    return (
        <div>
            {todos.map(todo => <TodoItem changeChecked={changeChecked} deleteTodo={deleteTodo} todo={todo} key={todo.id}/>)}
        </div>
    )
}

export default TodoList
