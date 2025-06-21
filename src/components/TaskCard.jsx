import { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { useTaskContext } from '../context/TaskContext'
import TaskModal from './TaskModal'

function TaskCard({ task }) {
  const { dispatch } = useTaskContext()
  const [showModal, setShowModal] = useState(false)
  
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id
  })
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch({ type: 'DELETE_TASK', payload: task.id })
    }
  }
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }
  
  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={`task-card bg-white border border-gray-200 rounded-lg p-4 cursor-grab ${
          isDragging ? 'opacity-50' : ''
        }`}
        onClick={() => setShowModal(true)}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
            <span className="text-xs text-gray-500 capitalize">{task.priority}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDelete()
            }}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            ×
          </button>
        </div>
        
        <h3 className="font-medium text-gray-800 mb-2">{task.title}</h3>
        <p className="text-sm text-gray-600 mb-3">
          {task.description}
        </p>
        
        <div className="text-xs text-gray-500">
          {new Date(task.createdAt).toLocaleDateString()}
        </div>
      </div>
      
      {showModal && (
        <TaskModal
          task={task}
          onClose={() => setShowModal(false)}
          onUpdate={(updatedTask) => {
            dispatch({ type: 'UPDATE_TASK', payload: updatedTask })
            setShowModal(false)
          }}
          onDelete={() => {
            handleDelete()
            setShowModal(false)
          }}
        />
      )}
    </>
  )
}

export default TaskCard 