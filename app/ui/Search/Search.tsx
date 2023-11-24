'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

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
    params.set('page', '1')
    push(`${PATH}?${params.toString()}`)
    const keywords = parseKeyword(keyword)
    // TODO: keywords를 여러개 전달해야함 ex) ?q=a&q=b...
  }

  return (
    <div>
      <form
        className="relative flex flex-1 flex-shrink-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register('keyword', {
            required: true,
            validate: validateMaxKeyword,
          })}
          role="search"
          placeholder="검색어를 입력해주세요"
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        />
        <input type="submit" value="검색" />
      </form>
      <p>{errors.keyword?.message}</p>
    </div>
  )
}

const parseKeyword = (keyword: string): string[] => {
  const seperatorRegex = /[\|\-]/
  return keyword.split(seperatorRegex)
}

const validateMaxKeyword = (input: string) => {
  const keywords = parseKeyword(input)
  if (keywords.length > 2) {
    return '키워드는 최대 2개까지 입력할 수 있습니다'
  }
  return true
}
