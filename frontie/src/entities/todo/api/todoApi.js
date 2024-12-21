import { axiosInstance } from '@shared/api/axios'

const ENDPOINTS = {
  GET_TODOS: '/todos',
  GET_TODO: (id) => `/todos/${id}`,
  CREATE_TODO: '/todos',
  UPDATE_TODO: (id) => `/todos/${id}`,
  DELETE_TODO: (id) => `/todos/${id}`,
}

export const todoApi = {
  async getTodos() {
    const { data } = await axiosInstance.get(ENDPOINTS.GET_TODOS)
    return data
  },

  async getTodoById(id) {
    const { data } = await axiosInstance.get(ENDPOINTS.GET_TODO(id))
    return data
  },

  async createTodo(todo) {
    const { data } = await axiosInstance.post(ENDPOINTS.CREATE_TODO, todo)
    return data
  },

  async updateTodo(id, todo) {
    const { data } = await axiosInstance.put(ENDPOINTS.UPDATE_TODO(id), todo)
    return data
  },

  async deleteTodo(id) {
    await axiosInstance.delete(ENDPOINTS.DELETE_TODO(id))
  },
}