import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Stripe from 'stripe'
import { useRouter } from '../../../node_modules/next/router'
import { stripe } from '../../lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'
import axios from 'axios'
import { useState } from 'react'
import Head from 'next/head'

interface ProductsProps {
  product: {
    id: string
    name: string
    imageURL: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Products({ product }: ProductsProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl // Redireciona para uma page externa
    } catch (error) {
      // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)

      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout')
    }
  }

  const { isFallback } = useRouter()

  if (isFallback) {
    // Preciso para utilizar o fallback como true, recomendado colocar um skeleton loading.
    return <p>LOADING...</p>
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageURL} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button onClick={handleBuyProduct} disabled={isCreatingCheckoutSession}>
            Comprar Agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: 'prod_MO9SReB4TO17IS', // Os id dos produtos colocados aqui seram utilizados para gerar a page estatica na hora do build
        },
      },
    ],
    fallback: true, // quando true ele vai pegar o parametro da page e vai chamar o getStaticProps fazendo a requisicao novamente utilizando esse parametro, gerando nesta hora a pagina estatica com o parametro que n??o foi dado previamente.
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  // <any = Tipagem do obejeto de props, {id: string} = a tipagem do params>
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageURL: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
