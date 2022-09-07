import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'

import { styled } from '../styles'
import { HomeContainer, Product } from '../styles/pages/home'

import camisa from '../assets/camisas/Shirt.png'
import camisa2 from '../assets/camisas/Shirt2.png'
import camisa3 from '../assets/camisas/Shirt3.png'

import 'keen-slider/keen-slider.min.css'

export default function Home(props) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <pre>{JSON.stringify(props.list)}</pre>

      <Product className="keen-slider__slide">
        <Image src={camisa} width={520} height={480} alt="" />

        <footer>
          <strong>Camisa X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={camisa2} width={520} height={480} alt="" />

        <footer>
          <strong>Camisa X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={camisa3} width={520} height={480} alt="" />

        <footer>
          <strong>Camisa X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={camisa3} width={520} height={480} alt="" />

        <footer>
          <strong>Camisa X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}

// Só utilizamos essa função para fazer requisições para nossa aplicação quando precisamos necessáriamente que essa informação esteja disponivel -
// - extamente na hora do carregamento da aplicação (Informações essas cruciais para Bots, Indexadores ou Cryles).

export const getServerSideProps = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return {
    props: {
      list: [1, 2, 3],
    },
  }
}
