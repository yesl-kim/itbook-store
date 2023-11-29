import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import mockRouter from 'next-router-mock'

import { routes } from 'constants/routes'
import Search from './search'

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))

describe('search component', () => {
  it('검색하면 입력값이 쿼리 파라미터("query")에 담겨 "books/"로 이동한다', () => {
    mockRouter.push('/')
    render(<Search />)

    const input = 'keyword'
    const search = screen.getByRole('search')
    fireEvent.change(search, { target: { value: input } })

    expect(mockRouter).toMatchObject({
      asPath: `${routes.search_books}?query=${input}`,
      pathname: routes.search_books,
      query: { query: input },
    })
  })
  it('입력값이 주어지지 않은 경우 검색은 무시된다', () => {})
  it('"|", "-"로 구분되는 검색 키워드는 최대 2개까지만 입력될 수 있다. 넘어갈 경우 검색이 무시된다', () => {})
  test('snapshot', () => {})
})
