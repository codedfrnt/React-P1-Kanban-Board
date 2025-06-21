import { useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { useTaskContext } from '../context/TaskContext'
import TaskCard from './TaskCard'
import TaskForm from './TaskForm'

function Column({ id, title, color }) {
  const { state, dispatch } = useTaskContext()
  const [showForm, setShowForm] = useState(false)
  
  const { setNodeRef, isOver } = useDroppable({ id })
  
  const tasks = state.tasks.filter(task => task.status === id)
  
  const handleAddTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      status: id,
      createdAt: new Date().toISOString()
    }
    
    dispatch({ type: 'ADD_TASK', payload: newTask })
    setShowForm(false)
  }
  
  return (
    <div
      ref={setNodeRef}
      className={`column bg-white rounded-lg shadow-md p-4 ${
        isOver ? 'drag-over' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${color}`}></div>
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="text-blue-600 hover:text-blue-800 text-2xl font-bold"
        >
          +
        </button>
      </div>
      
      {showForm && (
        <div className="mb-4">
          <TaskForm
            onSubmit={handleAddTask}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}
      
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      
      {tasks.length === 0 && !showForm && (
        <div className="text-center text-gray-500 py-8">
          <p className="text-sm">No tasks yet</p>
          <p className="text-xs mt-1">Drag tasks here or click + to add</p>
        </div>
      )}
    </div>
  )
}

export default Column 