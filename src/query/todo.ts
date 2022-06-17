import {gql} from '@apollo/client'

export const FETCH_TODOS = gql`
    query FetchTodos {
      todos {
        id
        title
        completed
      }
    }`


export const COMPLETED = gql`
    fragment MyTodo on Todo {
        completed
    }
  `

export const typeDefs = gql`
  extend type Todo {
    id: number
    title: string
    completed: boolean
  }
`