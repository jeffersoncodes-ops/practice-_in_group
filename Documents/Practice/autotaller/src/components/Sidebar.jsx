import { useTasks } from '../context/TaskContext'

export default function Sidebar() {
  const { setFilter, filter } = useTasks()

  const filters = [
    { value: 'todas', label: 'Todas' },
    { value: 'pendientes', label: 'Pendientes' },
    { value: 'completadas', label: 'Completadas' }
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        </div>
        <span className="brand-name">AutoTaller</span>
        <span className="brand-sub">Gestor de Tareas</span>
      </div>
      <nav className="sidebar-nav">
        {filters.map((f) => (
          <button
            key={f.value}
            className={`nav-item ${filter === f.value ? 'active' : ''}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}