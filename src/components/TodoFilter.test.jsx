import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TodoFilter from './TodoFilter'

describe('TodoFilter', () => {
  it('renders all three filter buttons', () => {
    render(<TodoFilter filter="all" onFilterChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Active' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Completed' })
    ).toBeInTheDocument()
  })

  it('marks the current filter button as active', () => {
    render(<TodoFilter filter="active" onFilterChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'Active' })).toHaveClass('active')
    expect(screen.getByRole('button', { name: 'All' })).not.toHaveClass(
      'active'
    )
    expect(
      screen.getByRole('button', { name: 'Completed' })
    ).not.toHaveClass('active')
  })

  it('calls onFilterChange with "active" when Active is clicked', () => {
    const onFilterChange = vi.fn()
    render(<TodoFilter filter="all" onFilterChange={onFilterChange} />)
    fireEvent.click(screen.getByRole('button', { name: 'Active' }))
    expect(onFilterChange).toHaveBeenCalledWith('active')
  })

  it('calls onFilterChange with "completed" when Completed is clicked', () => {
    const onFilterChange = vi.fn()
    render(<TodoFilter filter="all" onFilterChange={onFilterChange} />)
    fireEvent.click(screen.getByRole('button', { name: 'Completed' }))
    expect(onFilterChange).toHaveBeenCalledWith('completed')
  })

  it('calls onFilterChange with "all" when All is clicked', () => {
    const onFilterChange = vi.fn()
    render(<TodoFilter filter="active" onFilterChange={onFilterChange} />)
    fireEvent.click(screen.getByRole('button', { name: 'All' }))
    expect(onFilterChange).toHaveBeenCalledWith('all')
  })
})
