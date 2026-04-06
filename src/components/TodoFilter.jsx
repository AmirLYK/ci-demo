import './TodoFilter.css'

const FILTERS = ['all', 'active', 'completed']

function TodoFilter({ filter, onFilterChange }) {
  return (
    <div className="todo-filter">
      {FILTERS.map((f) => (
        <button
          key={f}
          className={filter === f ? 'active' : ''}
          onClick={() => onFilterChange(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default TodoFilter
