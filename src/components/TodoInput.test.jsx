import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TodoInput from './TodoInput'

describe('TodoInput', () => {
  it('renders input and button', () => {
    render(<TodoInput onAdd={() => {}} />)
    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })

  it('calls onAdd with trimmed text when submitted', () => {
    const onAdd = vi.fn()
    render(<TodoInput onAdd={onAdd} />)
    fireEvent.change(screen.getByPlaceholderText('Add a new task...'), {
      target: { value: 'Buy milk' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Add' }))
    expect(onAdd).toHaveBeenCalledWith('Buy milk')
  })

  it('clears the input after adding', () => {
    render(<TodoInput onAdd={() => {}} />)
    const input = screen.getByPlaceholderText('Add a new task...')
    fireEvent.change(input, { target: { value: 'Buy milk' } })
    fireEvent.click(screen.getByRole('button', { name: 'Add' }))
    expect(input.value).toBe('')
  })

  it('does not call onAdd when input is empty', () => {
    const onAdd = vi.fn()
    render(<TodoInput onAdd={onAdd} />)
    fireEvent.click(screen.getByRole('button', { name: 'Add' }))
    expect(onAdd).not.toHaveBeenCalled()
  })
})
