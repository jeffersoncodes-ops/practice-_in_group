import { useState } from 'react'
import { useTasks } from '../context/TaskContext'

export default function TaskForm() {
  const { addTask } = useTasks()
  const [name, setName] = useState('')
  const [priority, setPriority] = useState('media')
  const [date, setDate] = useState(() => {
    const now = new Date()
    return now.toISOString().split('T')[0]
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    addTask(name, priority, date)
    setName('')
    setPriority('media')
    setDate(() => {
      const now = new Date()
      return now.toISOString().split('T')[0]
    })
  }

  return (
    <form className="add-form card" onSubmit={handleSubmit}>
      <div className="form-group">
        <label style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '4px', display: 'block' }}>
          Nueva Tarea
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Describe la tarea..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '4px', display: 'block' }}>
          Prioridad
        </label>
        <select
          className="form-control"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
      </div>
      <div className="form-group">
        <label style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '4px', display: 'block' }}>
          Fecha
        </label>
        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button type="submit" className="btn-primary">
        Agregar
      </button>
    </form>
  )
}