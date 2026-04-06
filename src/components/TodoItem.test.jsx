import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TodoItem from './TodoItem'

const todo = { id: 1, text: 'Test task', completed: false }
const completedTodo = { id: 1, text: 'Test task', completed: true }

describe('TodoItem', () => {
  it('renders todo text', () => {
    render(<TodoItem todo={todo} onDelete={() => {}} onToggle={() => {}} />)
    expect(screen.getByText('Test task')).toBeInTheDocument()
  })

  it('calls onDelete with correct id when delete button clicked', () => {
    const onDelete = vi.fn()
    render(<TodoItem todo={todo} onDelete={onDelete} onToggle={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))
    expect(onDelete).toHaveBeenCalledWith(1)
  })

  it('calls onToggle with correct id when checkbox clicked', () => {
    const onToggle = vi.fn()
    render(<TodoItem todo={todo} onDelete={() => {}} onToggle={onToggle} />)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(onToggle).toHaveBeenCalledWith(1)
  })

  it('does not have completed class when not done', () => {
    const { container } = render(
      <TodoItem todo={todo} onDelete={() => {}} onToggle={() => {}} />
    )
    expect(container.querySelector('.todo-item')).not.toHaveClass('completed')
  })

  it('has completed class when todo is done', () => {
    const { container } = render(
      <TodoItem todo={completedTodo} onDelete={() => {}} onToggle={() => {}} />
    )
    expect(container.querySelector('.todo-item')).toHaveClass('completed')
  })
})
