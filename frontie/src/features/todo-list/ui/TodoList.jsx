import {TodoItem} from '@entities/todo/ui/TodoItem'

export const TodoList = ({ todos, onToggle, onDelete }) => {
  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}