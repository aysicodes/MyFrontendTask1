import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z }from 'zod';

const formSchema = z.object({
    title: z.string()
      .min(3, 'Title must be at least 3 characters')
      .max(50, 'Title must be less than 50 characters')
  })

export const TodoForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: ''
    }, 
    resolver: zodResolver(formSchema),
  })


  const onFormSubmit = (data) => {
    onSubmit(data.title)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="flex gap-4">
      <div className="flex-1">
        <input
          type="text"
          {...register('title')}
          placeholder="What needs to be done?"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </div>
      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add
      </button>
    </form>
  )
}
