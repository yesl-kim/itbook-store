import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import mockRouter from 'next-router-mock'

import { routes } from 'constants/routes'
import Search from './search'
import { validateMaxKeywords } from './validate'

jest.mock('next/navigation', () => {
  return {
    __esModule: true,
    useRouter: () => mockRouter,
    useSearchParams: () => new URLSearchParams(),
  }
})

interface InitialValue {
  input?: string
  route?: string
}

const search = async (initialValue = {} as InitialValue) => {
  const { input = '', route = '/' } = initialValue
  mockRouter.push(route)
  render(<Search />)

  const search = screen.getByRole('search')
  const submitButton = screen.getByDisplayValue('검색')
  fireEvent.change(search, { target: { value: input } })
  await waitFor(async () => fireEvent.submit(submitButton))

  return { router: mockRouter, search }
}

const initialRoute = {
  asPath: '/',
  query: {},
}

describe('search component', () => {
  it('입력값이 주어지지 않은 경우 검색은 무시된다', async () => {
    const { router } = await search()
    expect(router).toMatchObject(initialRoute)
  })

  it('검색하면 입력값이 쿼리 파라미터("query")에 담겨 "books/"로 이동한다', async () => {
    const input = 'keyword'
    const { router } = await search({ input })

    expect(router).toMatchObject({
      asPath: `${routes.search_books}?query=${input}`,
      pathname: routes.search_books,
      query: { query: input },
    })
  })

  it('"|", "-"로 구분되는 검색 키워드가 2개 이상 입력될 경우 검색이 무시되고 에러메세지가 출력된다', async () => {
    const input = 'keyword1|keyword2-not'
    const { router } = await search({ input })
    const errorMessage = validateMaxKeywords(input)

    expect(errorMessage).not.toBe(true)
    expect(await screen.findByText(errorMessage as string)).toBeInTheDocument()
    expect(router).toMatchObject(initialRoute)
  })

  test('snapshot', () => {
    expect(render(<Search />)).toMatchSnapshot()
  })
})
