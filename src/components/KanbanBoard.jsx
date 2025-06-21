import { DndContext, closestCenter } from '@dnd-kit/core'
import { useEffect } from 'react'
import { useTaskContext } from '../context/TaskContext'
import Column from './Column'

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-blue-500' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-yellow-500' },
  { id: 'done', title: 'Done', color: 'bg-green-500' }
]

function KanbanBoard() {
  const { state, dispatch } = useTaskContext()

  const handleDragEnd = (event) => {
    const { active, over } = event
    
    if (!over) return
    
    const taskId = active.id
    const newStatus = over.id
    
    dispatch({
      type: 'MOVE_TASK',
      payload: { id: taskId, status: newStatus }
    })
  }

  // Hide the task creation message after 3 seconds
  useEffect(() => {
    if (state.showTaskCreatedMessage) {
      const timer = setTimeout(() => {
        dispatch({ type: 'HIDE_TASK_MESSAGE' })
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [state.showTaskCreatedMessage, dispatch])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Pro-Kanban</h1>
        <p className="text-gray-600">Organize your tasks efficiently.</p>
        <p className="text-grey-600">"+" to add task & double-tap the task to edit it.</p>
        {state.showTaskCreatedMessage && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg animate-fade-in">
            <p className="text-sm font-medium">Double click the respective task to edit.</p>
          </div>
        )}
      </div>
      
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(column => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              color={column.color}
            />
          ))}
        </div>
      </DndContext>
    </div>
  )
}

export default KanbanBoard 
