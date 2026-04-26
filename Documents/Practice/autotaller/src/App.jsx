import { TaskProvider } from './context/TaskContext'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import Stats from './components/Stats'
import TaskList from './components/TaskList'
import EcuadorMap from './components/EcuadorMap'
import './index.css'

function App() {
  return (
    <TaskProvider>
      <div className="app">
        <Sidebar />
        <main className="main">
          <Header />
          <div className="main-content">
            <EcuadorMap />
            <TaskForm />
            <Stats />
            <TaskList />
          </div>
          <footer className="main-footer">
            <small>© 2026 AutoTaller | Realizado por Gabriel, Johana, Jefferson</small>
          </footer>
        </main>
      </div>
    </TaskProvider>
  )
}

export default App