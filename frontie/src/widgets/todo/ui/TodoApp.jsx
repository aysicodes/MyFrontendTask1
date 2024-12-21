import  { useCallback, useState } from 'react'
import { TodoList } from '@features/todo-list/ui/TodoList'
import { TodoForm } from '@features/todo-create/ui/TodoForm'
import {useTodoList } from "@entities/todo/hooks/useTodoList.js";
import React from 'react'

export const TodoApp = () => {
   // 1. Initialize todos state
   const {
    todos,
    fetchTodos
  } = useTodoList()


  React.useEffect(() => {
    fetchTodos()
  }, [])


   // 2. Create handler for adding todos
  const handleSubmit = useCallback((title) => {
    const newTodo = {
      id: Date.now(),
      title: title.title,
      completed: false
    }
  }, [])

   // 3. Create handler for toggling todos
   const handleToggle = useCallback((id) => {
  
  }, [])

    // 4. Create handler for deleting todos
    const handleDelete = useCallback((id) => {
      setTodos(prev => prev.filter(todo => todo.id !== id))
    }, [])



  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm onSubmit={handleSubmit} />
      <TodoList
        todos={todos}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  )
}
