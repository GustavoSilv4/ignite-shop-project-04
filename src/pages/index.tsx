import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'

import Stripe from 'stripe'
import { stripe } from '../lib/stripe'

import { HomeContainer, Product } from '../styles/pages/home'

import 'keen-slider/keen-slider.min.css'
import Link from 'next/link'

interface HomeProps {
  products: {
    id: string
    name: string
    imageURL: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            // prefetch como false previne que quando o elemento Link estive em tela o react faça a requisição da pagina sem nem está nela.
            <Link key={product.id} href={`/products/${product.id}`} prefetch={false}>
              <Product className="keen-slider__slide">
                <Image src={product.imageURL} width={520} height={480} alt="" />

                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

// Só utilizamos essa função para fazer requisições para nossa aplicação quando precisamos necessáriamente que essa informação esteja disponivel -
// - extamente na hora do carregamento da aplicação (Informações essas cruciais para Bots, Indexadores ou Cryles).

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageURL: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100), // Por ele vim em centavos multiplicamos por 100
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 Horas
  }
}
