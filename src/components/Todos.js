import React, { useState, useEffect, useContext } from 'react'
import { Table, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { deleteTodo, getTodos } from '../actions/todos'
import { AlertContext } from '../context/AlertContext'
import { useHistory } from 'react-router'
import Spinner from './Spinner'
import moment from 'moment'

const Todos = () => {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { setAlertTimeout } = useContext(AlertContext)
  const history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTodos('Charlie')

      setTodos(data)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const deleteTodoClicked = async (id) => {
    let user = 'Charlie'

    await deleteTodo(user, id)

    const data = await getTodos('Charlie')
    setTodos(data)

    setAlertTimeout({ message: `${user}'s todo was deleted` })
  }

  const updateTodoClicked = async (id) => {
    console.log('update', id)
    history.push(`/todos/${id}`)
  }

  const addTodoClicked = async () => {
    console.log('add')
    history.push(`/todos/-1`)
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <Wrapper>
      <h1>Todos</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>description</th>
            <th>isCompleted</th>
            <th>targetDate</th>
            <th>update</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr>
              <td>{todo.id}</td>
              <td>{todo.description}</td>
              <td>{todo.isCompleted ? 'true' : 'false'}</td>
              <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => updateTodoClicked(todo.id)}
                >
                  Update
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => deleteTodoClicked(todo.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={addTodoClicked}>
        Add
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 450px;
`

export default Todos
