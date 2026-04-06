import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TodoList from './TodoList'

const todos = [
  { id: 1, text: 'Task one', completed: false },
  { id: 2, text: 'Task two', completed: true },
]

describe('TodoList', () => {
  it('renders all todos', () => {
    render(<TodoList todos={todos} onDelete={() => {}} onToggle={() => {}} />)
    expect(screen.getByText('Task one')).toBeInTheDocument()
    expect(screen.getByText('Task two')).toBeInTheDocument()
  })

  it('shows empty message when there are no todos', () => {
    render(<TodoList todos={[]} onDelete={() => {}} onToggle={() => {}} />)
    expect(screen.getByText('No tasks here.')).toBeInTheDocument()
  })

  it('calls onDelete with correct id', () => {
    const onDelete = vi.fn()
    render(<TodoList todos={todos} onDelete={onDelete} onToggle={() => {}} />)
    fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0])
    expect(onDelete).toHaveBeenCalledWith(1)
  })

  it('calls onToggle with correct id', () => {
    const onToggle = vi.fn()
    render(<TodoList todos={todos} onDelete={() => {}} onToggle={onToggle} />)
    fireEvent.click(screen.getAllByRole('checkbox')[0])
    expect(onToggle).toHaveBeenCalledWith(1)
  })
})
