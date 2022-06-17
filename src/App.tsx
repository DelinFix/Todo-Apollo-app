import './App.css'
import * as React from "react"
import TodoList from "./components/TodoList.tsx"
import AddTodo from "./components/AddTodo.tsx"

function App() {
    return (
        <div className="App">
            <AddTodo/>
            <TodoList/>
        </div>
    )
}

export default App
