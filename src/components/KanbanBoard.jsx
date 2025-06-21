import { DndContext, closestCenter } from '@dnd-kit/core'
import { useTaskContext } from '../context/TaskContext'
import Column from './Column'

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-blue-500' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-yellow-500' },
  { id: 'done', title: 'Done', color: 'bg-green-500' }
]

function KanbanBoard() {
  const { dispatch } = useTaskContext()

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Pro-Kanban</h1>
        <p className="text-gray-600">Organize your tasks efficiently</p>
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