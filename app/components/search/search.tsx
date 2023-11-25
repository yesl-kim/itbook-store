'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { validateMaxKeywords } from './lib/validate'

interface SearchForm {
  keyword: string
}

const PATH = '/books'
export default function Search() {
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchForm>({
    defaultValues: {
      keyword: searchParams.get('query')?.toString(),
    },
  })

  const onSubmit: SubmitHandler<SearchForm> = ({ keyword }) => {
    const params = new URLSearchParams()
    params.set('query', keyword)
    push(`${PATH}?${params.toString()}`)
  }

  return (
    <>
      <form
        className="relative flex gap-2 w-full max-w-[900px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register('keyword', {
            required: true,
            validate: (v) => validateMaxKeywords(v),
          })}
          role="search"
          placeholder="검색어를 입력해주세요"
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-50"
        />
        <input type="submit" value="검색" />
      </form>
      <p className="text-sm text-red-400">{errors.keyword?.message}</p>
    </>
  )
}
