import { useTasks } from '../context/TaskContext'

export default function Stats() {
  const { stats } = useTasks()

  return (
    <div className="stats-group">
      <div className="stat-badge">
        <span className="num">{stats.total}</span>
        <span className="lbl">Total</span>
      </div>
      <div className="stat-badge">
        <span className="num">{stats.pending}</span>
        <span className="lbl">Pendientes</span>
      </div>
      <div className="stat-badge">
        <span className="num">{stats.completed}</span>
        <span className="lbl">Completadas</span>
      </div>
    </div>
  )
}