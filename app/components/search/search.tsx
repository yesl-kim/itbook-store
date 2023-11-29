'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

import { parameters, routes } from 'constants/routes'
import { validateMaxKeywords } from './validate'

export default function Search() {
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchParams>({
    defaultValues: {
      query: searchParams.get(parameters.query)?.toString(),
    },
  })

  const onSubmit: SubmitHandler<SearchParams> = ({ query }) => {
    const params = new URLSearchParams()
    params.set(parameters.query, query)
    push(`${routes.search_books}?${params.toString()}`)
  }

  return (
    <>
      <form
        className="relative flex gap-2 w-full max-w-[900px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register('query', {
            required: true,
            validate: (v) => validateMaxKeywords(v),
          })}
          role="search"
          placeholder="검색어를 입력해주세요"
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-50"
        />
        <input type="submit" value="검색" />
      </form>
      <p className="text-sm text-red-400">{errors.query?.message}</p>
    </>
  )
}
