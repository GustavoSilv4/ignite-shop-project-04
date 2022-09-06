import { useRouter } from '../../../node_modules/next/router'

export default function Products() {
  const { query } = useRouter()

  return (
    <div>
      <h1>Products </h1>
      <span>{JSON.stringify(query)}</span>
    </div>
  )
}
