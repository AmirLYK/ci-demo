import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('adds a todo', () => {
    render(<App />)
    const input = screen.getByPlaceholderText('Add a new task...')
    fireEvent.change(input, { target: { value: 'New task' } })
    fireEvent.click(screen.getByRole('button', { name: 'Add' }))
    expect(screen.getByText('New task')).toBeInTheDocument()
  })

  it('deletes a todo', () => {
    render(<App />)
    const input = screen.getByPlaceholderText('Add a new task...')
    fireEvent.change(input, { target: { value: 'To delete' } })
    fireEvent.click(screen.getByRole('button', { name: 'Add' }))
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))
    expect(screen.queryByText('To delete')).not.toBeInTheDocument()
  })

  it('marks a todo as completed', () => {
    render(<App />)
    const input = screen.getByPlaceholderText('Add a new task...')
    fireEvent.change(input, { target: { value: 'Complete me' } })
    fireEvent.click(screen.getByRole('button', { name: 'Add' }))
    fireEvent.click(screen.getByRole('checkbox'))
    const item = screen.getByText('Complete me').closest('.todo-item')
    expect(item).toHaveClass('completed')
  })

  it('filters todos - shows only active', () => {
    render(<App />)
    const input = screen.getByPlaceholderText('Add a new task...')

    fireEvent.change(input, { target: { value: 'Active task' } })
    fireEvent.click(screen.getByRole('button', { name: 'Add' }))
    fireEvent.change(input, { target: { value: 'Done task' } })
    fireEvent.click(screen.getByRole('button', { name: 'Add' }))

    fireEvent.click(screen.getAllByRole('checkbox')[1])
    fireEvent.click(screen.getByRole('button', { name: 'Active' }))

    expect(screen.getByText('Active task')).toBeInTheDocument()
    expect(screen.queryByText('Done task')).not.toBeInTheDocument()
  })

  it('filters todos - shows only completed', () => {
    render(<App />)
    const input = screen.getByPlaceholderText('Add a new task...')

    fireEvent.change(input, { target: { value: 'Active task' } })
    fireEvent.click(screen.getByRole('button', { name: 'Add' }))
    fireEvent.change(input, { target: { value: 'Done task' } })
    fireEvent.click(screen.getByRole('button', { name: 'Add' }))

    fireEvent.click(screen.getAllByRole('checkbox')[1])
    fireEvent.click(screen.getByRole('button', { name: 'Completed' }))

    expect(screen.queryByText('Active task')).not.toBeInTheDocument()
    expect(screen.getByText('Done task')).toBeInTheDocument()
  })
})
