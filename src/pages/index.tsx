import { GetStaticProps } from 'next'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'

import Stripe from 'stripe'
import { stripe } from '../lib/stripe'

import { HomeContainer, Product } from '../styles/pages/home'

import 'keen-slider/keen-slider.min.css'

interface HomeProps {
  products: {
    id: string
    name: string
    imageURL: string
    price: number
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
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => {
        return (
          <Product className="keen-slider__slide" key={product.id}>
            <Image src={product.imageURL} width={520} height={480} alt="" />

            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        )
      })}
    </HomeContainer>
  )
}

// Só utilizamos essa função para fazer requisições para nossa aplicação quando precisamos necessáriamente que essa informação esteja disponivel -
// - extamente na hora do carregamento da aplicação (Informações essas cruciais para Bots, Indexadores ou Cryles).

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((products) => {
    const price = products.default_price as Stripe.Price

    return {
      id: products.id,
      name: products.name,
      imageURL: products.images[0],
      price: price.unit_amount / 100, // Por ele vim em centavos multiplicamos por 100
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 Horas
  }
}
