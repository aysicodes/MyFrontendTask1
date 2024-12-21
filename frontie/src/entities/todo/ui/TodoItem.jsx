
export const TodoItem = ({ todo, onToggle, onDelete }) => {
    return (
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span>{todo.title}</span>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    )
  }