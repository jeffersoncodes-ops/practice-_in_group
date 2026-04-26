import { useTasks } from '../context/TaskContext'

export default function TaskList() {
  const { tasks, toggleTask, deleteTask } = useTasks()

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  if (tasks.length === 0) {
    return (
      <div className="card">
        <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '20px' }}>
          No hay tareas para mostrar
        </p>
      </div>
    )
  }

  return (
    <div className="card">
      {tasks.map((task) => (
        <div key={task.id} className={`task-item ${task.priority}`}>
          <div className="task-status-circle" />
          <div className="task-info">
            <span
              className="task-name"
              style={{
                textDecoration: task.done ? 'line-through' : 'none',
                opacity: task.done ? 0.5 : 1
              }}
            >
              {task.name}
            </span>
            <div className="task-meta">
              <span className="priority-tag">{task.priority}</span>
              <span className="task-date">{formatDate(task.date)}</span>
            </div>
          </div>
          <div className="task-actions">
            <button
              className="icon-btn"
              onClick={() => toggleTask(task.id)}
              title={task.done ? 'Marcar pendiente' : 'Marcar completada'}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {task.done ? (
                  <path d="M3 12h18M12 3v18" />
                ) : (
                  <polyline points="20 6 9 17 4 12" />
                )}
              </svg>
            </button>
            <button
              className="icon-btn delete"
              onClick={() => deleteTask(task.id)}
              title="Eliminar"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}