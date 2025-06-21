import { TaskProvider } from './context/TaskContext'
import KanbanBoard from './components/KanbanBoard'

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <KanbanBoard />
      </div>
    </TaskProvider>
  )
}

export default App 