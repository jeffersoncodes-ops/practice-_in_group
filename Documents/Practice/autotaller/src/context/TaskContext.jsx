import { createContext, useContext, useState, useEffect } from 'react'

const TaskContext = createContext(null)

const STORAGE_KEY = 'autotaller_data'
const ESCAPE_REGEX = /[&<>"']/g
const ESCAPE_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}

function sanitize(str) {
  return String(str).replace(ESCAPE_REGEX, (char) => ESCAPE_MAP[char])
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

function loadFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : { tasks: [], filter: 'todas' }
  } catch {
    return { tasks: [], filter: 'todas' }
  }
}

function saveToStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => loadFromStorage().tasks)
  const [filter, setFilter] = useState(() => loadFromStorage().filter)

  useEffect(() => {
    saveToStorage({ tasks, filter })
  }, [tasks, filter])

  const addTask = (name, priority, date) => {
    const newTask = {
      id: generateId(),
      name: sanitize(name.trim()),
      priority,
      date,
      done: false
    }
    setTasks((prev) => [...prev, newTask])
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pendientes') return !t.done
    if (filter === 'completadas') return t.done
    return true
  })

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => !t.done).length,
    completed: tasks.filter((t) => t.done).length
  }

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        allTasks: tasks,
        filter,
        setFilter,
        addTask,
        deleteTask,
        toggleTask,
        stats
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider')
  }
  return context
}