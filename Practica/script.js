
const INITIAL_STATE = { tasks: [], filter: 'todas', nextId: 1 };

const loadState = () => {
  try {
    const saved = localStorage.getItem('autotaller_data');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  } catch (err) {
    console.error("Error al cargar localStorage:", err);
    return INITIAL_STATE;
  }
};

let state = loadState();

// 2. Selectores Centralizados
const dom = {
  taskInput: () => document.getElementById('taskInput'),
  prioritySelect: () => document.getElementById('prioritySelect'),
  dateInput: () => document.getElementById('dateInput'),
  taskList: () => document.getElementById('taskList'),
  stats: {
    total: document.getElementById('statTotal'),
    pending: document.getElementById('statPending'),
    completed: document.getElementById('statCompleted')
  }
};

// 3. Utilidades
const fmtDate = d => d ? d.split('-').reverse().join('/') : '';

// Previene ataques XSS convirtiendo caracteres especiales
const sanitize = str => {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
};

const save = () => localStorage.setItem('autotaller_data', JSON.stringify(state));

// 4. Lógica de Negocio (Acciones)
window.setFilter = (filter) => {
  state.filter = filter;
  render();
};

window.addTask = () => {
  const input = dom.taskInput();
  const name = input.value.trim();

  if (!name) return input.focus();

  const newTask = {
    id: state.nextId++,
    name: sanitize(name), // Texto seguro
    priority: dom.prioritySelect().value,
    date: dom.dateInput().value,
    done: false
  };

  state.tasks = [...state.tasks, newTask]; // Inmutabilidad
  input.value = '';
  render();
};

window.toggleTask = (id) => {
  state.tasks = state.tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
  render();
};

window.deleteTask = (id) => {
  if (!confirm("¿Eliminar esta orden de trabajo?")) return;
  state.tasks = state.tasks.filter(t => t.id !== id);
  render();
};

// 5. Motor de Renderizado
function render() {
  save();
  const { tasks, filter } = state;

  // Sincronizar UI de filtros
  document.querySelectorAll('.nav-item, .filter-btn').forEach(btn => {
    const isActive = btn.getAttribute('onclick')?.includes(`'${filter}'`);
    btn.classList.toggle('active', isActive);
  });

  // Filtrar y Calcular Stats
  const visibleTasks = tasks.filter(t => 
    filter === 'pendientes' ? !t.done : filter === 'completadas' ? t.done : true
  );

  const doneCount = tasks.filter(t => t.done).length;
  dom.stats.total.textContent = tasks.length;
  dom.stats.pending.textContent = tasks.length - doneCount;
  dom.stats.completed.textContent = doneCount;

  // Dibujar Lista
  const container = dom.taskList();
  
  if (visibleTasks.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="text-align: center; padding: 40px; color: var(--muted); opacity: 0.6;">
        <p>${tasks.length === 0 ? 'No hay órdenes registradas.' : 'No hay tareas en esta categoría.'}</p>
      </div>`;
    return;
  }

  container.innerHTML = visibleTasks.map(t => `
    <div class="task-item ${t.priority.toLowerCase()} ${t.done ? 'is-done' : ''}">
      <div class="task-status-circle"></div>
      
      <div class="task-info">
        <div class="task-name ${t.done ? 'done' : ''}">${t.name}</div>
        <div class="task-meta">
          <span class="priority-tag ${t.priority.toLowerCase()}">${t.priority}</span>
          ${t.date ? `<span class="task-date">📅 ${fmtDate(t.date)}</span>` : ''}
        </div>
      </div>

      <div class="task-actions">
        <button class="icon-btn" onclick="toggleTask(${t.id})" title="Alternar estado">
          ${t.done ? '↺' : '✓'}
        </button>
        <button class="icon-btn delete" onclick="deleteTask(${t.id})" title="Eliminar">🗑</button>
      </div>
    </div>
  `).join('');
}

// 6. Arranque
document.addEventListener('DOMContentLoaded', () => {
  // Fecha por defecto hoy
  if (dom.dateInput()) {
    dom.dateInput().value = new Date().toISOString().split('T')[0];
  }

  // Atajo Enter
  dom.taskInput().addEventListener('keydown', e => {
    if (e.key === 'Enter') addTask();
  });

  render();
});