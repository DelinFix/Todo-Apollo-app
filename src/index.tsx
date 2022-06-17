import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client"
import ReactDOM from "react-dom/client"
import * as React from "react"
import App from "./App.tsx"
import {FETCH_TODOS, typeDefs} from "./query/todo.ts"

const client = new ApolloClient({
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        todos: {
                            keyArgs: false,
                            merge: false
                        },
                    }
                }
            }
        }),
        typeDefs
    })

client.writeQuery({query: FETCH_TODOS, data: {todos: []}})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)
