import React, { createContext, useContext, useReducer, useEffect } from 'react'

const TaskContext = createContext()

const initialState = {
  tasks: [],
  showTaskCreatedMessage: false
}

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        showTaskCreatedMessage: true
      }
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.id ? action.payload : task
        )
      }
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      }
    case 'MOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id 
            ? { ...task, status: action.payload.status }
            : task
        )
      }
    case 'LOAD_TASKS':
      return {
        ...state,
        tasks: action.payload
      }
    case 'HIDE_TASK_MESSAGE':
      return {
        ...state,
        showTaskCreatedMessage: false
      }
    default:
      return state
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  useEffect(() => {
    const savedTasks = localStorage.getItem('kanban-tasks')
    if (savedTasks) {
      dispatch({ type: 'LOAD_TASKS', payload: JSON.parse(savedTasks) })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(state.tasks))
  }, [state.tasks])

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTaskContext() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider')
  }
  return context
} 